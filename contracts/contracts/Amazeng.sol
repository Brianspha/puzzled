pragma solidity >=0.5.10;
import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "./Sablier.sol";
import "./shared-contracts/interfaces/ICERC20.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/math/SafeMath.sol";

/**
@dev Stream Manager Contract Definition
@notice Responsible for managing all user sablier streams
 */

contract Amazeng is Initializable {
    using SafeMath for uint256;
    /*=========================== Events definition Start =========================== */
    event streamCreated(uint256 indexed streamId);
    /**=========================================================== contract variables definition start/**=========================================================== */

    ICERC20 tokenContract;
    address owner;
    Sablier sablierContract;

    function init(address tokenAddress, address sablierAddress)
        public
        initializer
    {
        require(
            sablierAddress != address(0) ||
                sablierAddress != tokenAddress ||
                sablierAddress != msg.sender,
            "Invalid sablier address"
        );
        require(msg.sender != address(0), "Invalid sender address");
        require(
            tokenAddress != address(0) || msg.sender != tokenAddress,
            "Invalid token address"
        );
        sablierContract = Sablier(sablierAddress);
        tokenContract=ICERC20(tokenAddress);
        owner = msg.sender;
    }

    function startStream(
        uint256 amount,
        uint256 startDate,
        uint256 endDate
    ) public returns (uint256) {
        require(amount >0 && startDate>0 && endDate >0, "Start End and Amount must be greater than 0");
        require(msg.sender != address(0), "Invalid sender address");
         require(
            tokenContract.approve(address(sablierContract), amount),
            "Something went wrong whilst approving token"
        );
        uint256 stream_id = sablierContract.createStream(
            msg.sender,
            amount,
            address(tokenContract),
            startDate,
            endDate
        );
        emit streamCreated(stream_id);
    }
}
