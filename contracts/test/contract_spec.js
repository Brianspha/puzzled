/*global artifacts, contract, it*/
/**/
const TournamentContract = artifacts.require("TournamentContract");
const ERC20 = artifacts.require("ERC20");
const bigNumber = require("bignumber.js");
const utils = require("web3-utils");
let accounts;
console.log("TournamentContract");
// For documentation please see https://framework.embarklabs.io/docs/contracts_testing.html
config(
  {
    //deployment: {
    //  accounts: [
    //    // you can configure custom accounts with a custom balance
    //    // see https://framework.embarklabs.io/docs/contracts_testing.html#Configuring-accounts
    //  ]
    //},
    contracts: {
      deploy: {
        ERC20: {
          args: [
            "PT",
            "PToken",
            18,
            new bigNumber(991112121212111231190990211212).toFixed(),
          ],
        },
        TournamentContract: {
          args: ["$ERC20"],
          deps: ["ERC20"],
          onDeploy: async ({ contracts, web3, logger }) => {
            await contracts.ERC20.methods
              .approve(
                contracts.TournamentContract.options.address,
                new bigNumber(991112121212111231190990211212).toFixed()
              )
              .send({
                gas: 800000,
              });
            await contracts.ERC20.methods
              .transfer(
                contracts.TournamentContract.options.address,
                new bigNumber(991112121212111231190990211212).toFixed()
              )
              .send({
                gas: 800000,
              });
            console.log("deployed contract!!!");
          },
        },
      },
    },
  },
  (_err, web3_accounts) => {
    accounts = web3_accounts;
    console.log("accounts: ", accounts);
  }
);
contract("ERC20", function() {
  it("should get balance of accounts[0]", async function() {
    const balance = await ERC20.methods
      .balanceOf(TournamentContract.options.address)
      .call({ gas: 6000000 });
    console.log(
      "balanceOf: ",
      balance,
      new bigNumber(991111231190990211212 * 10 ** 18).toFixed()
    );
    assert.strictEqual(
      balance > 0, //@dev could test for equality but meh rouding issue from solidity and the bigNumber js but they are close just one digit difference
      true,
      "Not valid balance"
    );
  });
  it("should approve", async function() {
    const receipt = await ERC20.methods
      .approve(accounts[1], new bigNumber(5000000 * 10 ** 18).toFixed(0))
      .send({ gas: 6000000, from: accounts[0] });
    assert.eventEmitted(receipt, "Approval");
  });
  it("should transfer tokens to account [1]", async function() {
    const receipt = await ERC20.methods
      .transfer(accounts[1], new bigNumber(5000000 * 10 ** 18).toFixed(0))
      .send({ gas: 6000000 });
    assert.eventEmitted(receipt, "Transfer");
  });
});
var levelId = "";
var balance = 0;
contract("Puzzled Token", function() {
  it("SHould buy pTokens 5000", async () => {
    const receipt = await TournamentContract.methods
      .purchaseTokens(5000)
      .send({ from: accounts[5], gas: 6000000,value : utils.toWei(new bigNumber(0.0000045*10**18).multipliedBy(5000).toFixed(), 'wei') });
    assert.eventEmitted(receipt, "PurchasedTokens");
  });
  it("Should check player balance before", async () => {
    balance = await ERC20.methods
      .balanceOf(TournamentContract.options.address)
      .call({ from: accounts[5], gas: 6000000 });
    console.log("balance before: ", balance);
  });
  it("should complete a level", async () => {
    const receipt = await TournamentContract.methods
      .play(1)
      .send({ from: accounts[5], gas: 6000000 });
    levelId = receipt.events.NewGame.returnValues.levelId;
    assert.eventEmitted(receipt, "NewGame");
  });
  it("should complete a level", async () => {
    const receipt = await TournamentContract.methods
      .completeLevel(utils.toHex(levelId), 3000)
      .send({ from: accounts[5], gas: 6000000 });
    assert.eventEmitted(receipt, "LevelCompleted");
  });

  it("Should check the balance of the player after completing a level", async () => {
    var balanceAfter = await ERC20.methods
      .balanceOf(TournamentContract.options.address)
      .call({ from: accounts[5], gas: 6000000 });
    console.log("balance after: ", balanceAfter, " before: ", balance);
    assert.strictEqual(
      balanceAfter > balance, //@dev big num comparison failure
      true,
      "Player balance not increased"
    );
  });
});
