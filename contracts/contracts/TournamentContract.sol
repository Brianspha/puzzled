pragma solidity >=0.5.10;
import "./SafeMath.sol";
import './IERC20.sol';
contract TournamentContract {
 using SafeMath
    for uint256;
/*============================================Modifier ============================================ */
 modifier onlyOwner(){
     require(msg.sender ==owner, "Only owner can call this function");
     _;
 }
/*============================================Structs ============================================ */
struct Player {
    address playerId;
    uint256 [] levelsCompleted;
    bool active;
}

struct Level{
    bytes32 id;
    uint level;
    uint date;
    uint256 score;
    address completedBy;
    bool active;
}
/*============================================Events ============================================ */
event LevelCompleted (uint indexed level, address indexed completedBy, uint256 indexed payout);
event NewGame(bytes32 indexed levelId);
event PurchasedTokens(uint256 indexed amount,uint256 indexed cost);
/*============================================Variables ============================================ */
address owner;
IERC20 tokenContract;
address [] playersIds;
mapping(address=> Player) players;
mapping (bytes32=>Level) levelsCompleted;
uint256 perToken;
uint256 ethCollected;
/*============================================Function ============================================ */


constructor (address tokenAddress) public{
    require(msg.sender !=address(0), "Invalid sender address");
    require(tokenAddress != address(0), "Invalid sender token address");
    tokenContract = IERC20(tokenAddress);
    owner = msg.sender;
    perToken=0.0000045 ether;
    ethCollected=0;
}
function withdrawEth() public onlyOwner{
    require(ethCollected>0 ,"Not eth to withdraw");
    uint256 tempEth = ethCollected;
    ethCollected=0;
    require(msg.sender.send(tempEth), "withdrawEth:Something went wrong");
}
function getTotalCollectedEth() public view returns (uint256) {
    return ethCollected;
}
function purchaseTokens(uint256 amount) public payable {
    require(msg.value >= amount * perToken);
    ethCollected =ethCollected.add(amount.mul(perToken));
    require(tokenContract.approve(msg.sender,amount *10 **18), "Approve Failed");
    require(tokenContract.transfer(msg.sender,amount *10 **18), "Transfer Failed");
    emit PurchasedTokens(amount,amount * perToken);
}
function play(uint level) public {
        require(level >0 && level<=6, "Invalid level");
        bytes32 levelId = keccak256(abi.encodePacked(msg.sender,block.timestamp,level));
        levelsCompleted[levelId].active=true;
        levelsCompleted[levelId].level=level;
        emit NewGame(levelId);
}
//@dev bad function anyone can call this function
function completeLevel(bytes32 levelId,uint256 score) public{
 require(msg.sender != address(0), "Invalid sender");
 require(levelsCompleted[levelId].active, "Already completed level");
 require(tokenContract.approve(msg.sender,score *10 **18), "Approve Failed");
 require(tokenContract.transfer(msg.sender,score *10 **18), "Transfer Failed");
    players[msg.sender].playerId=msg.sender;
    players[msg.sender].levelsCompleted.push(levelsCompleted[levelId].level);
    playersIds.push(msg.sender);
    levelsCompleted[levelId].date = block.timestamp;
    levelsCompleted[levelId].score = score;
    levelsCompleted[levelId].active=false;
    levelsCompleted[levelId].completedBy=msg.sender;
    emit LevelCompleted(levelsCompleted[levelId].level,msg.sender,score*10**18);
}
  

}