/*global artifacts, contract, it*/
/**/
// For documentation please see https://framework.embarklabs.io/docs/contracts_testing.html
const Token = artifacts.require("ERC20");
const Sablier = artifacts.require("Sablier");
const Amazeng = artifacts.require("Amazeng");
const bigNumber = require("bignumber.js");
const intialAmount = new bigNumber(6000000 * 10 ** 18).toFixed();

let accounts1,
  tokenAmount,
  startDate,
  balance,
  endDate,
  deposit,
  streamId,
  keys,
  tokenID,
  decimals;
config(
  {
    contracts: {
      deploy: {
        Amazeng: {
          deps: ["ERC20", "Sablier"],
          onDeploy: async ({ contracts, web3, logger }) => {
            console.log("contracts: ", web3.eth.defaultAccount);
            await contracts.Amazeng.methods
              .init(
                contracts.ERC20.options.address,
                contracts.Sablier.options.address
              )
              .send({
                gas: 800000,
              });

            await contracts.ERC20.methods
              .transfer(contracts.Amazeng.options.address, intialAmount)
              .send({
                gas: 800000,
              });

            console.log("approved Amazeng contract...");
          },
        },
        ERC20: {
          args: ["AmazengToken", "AT", 18, intialAmount],
        },
        CTokenManager: {
          args: [],
        },
        Sablier: {
          deps: ["ERC20"],
          args: ["$CTokenManager"],
        },
      },
    },
  },
  (err, accs) => {
    accounts = accs;
  }
);

contract("ERC720", async () => {
  it("should init  token contract and mint tokens", async () => {
    it("should transfer tokens to the Amazeng Contract", async () => {
      await Token.methods.transfer(Amazeng.options.address, intialAmount).send({
        gas: 600000,
      });
      assert.strictEqual(receipt != null, true);
      // console.log('receipt: ', receipt.events.Approval.returnValues)
    });
    /**/
  });

  it("should transfer 100000000000000000000000", async () => {
    var receipt = await Token.methods
      .transfer(accounts[1], new bigNumber(200000000000000000000000000))
      .send({
        gas: 6000000,
      });
    assert.strictEqual(receipt != null, true);
    // console.log('receipt: ', receipt.events.Approval.returnValues)
  });
});

contract("Amezeng", async function() {
  console.log("Amazeng.options.address: ", Amazeng.options.address);
  it("should start a stream", async function() {
    tokenAmount = new bigNumber(Math.round(Math.random() * 300));
    tokenAmount = tokenAmount.multipliedBy(new bigNumber(10).pow(18));
    startDate = new bigNumber(
      new Date(new Date().setHours(new Date().getMinutes() + 10)).getTime()
    ).toFixed();
    endDate = new bigNumber(
      new Date(new Date().setDate(new Date().getDate() + 5)).getTime()
    ).toFixed(); //5 days from now
    startDate = Math.round(startDate);
    endDate = Math.round(endDate);
    console.log("startDate: ", startDate);
    console.log("endDate: ", endDate);
    console.log("tokenAmount: ", tokenAmount);
    var timeDelta = new bigNumber(endDate - startDate);
    console.log("timeDelta: ", timeDelta);
    deposit = calculateDeposit(timeDelta, tokenAmount);
    var bal = await Token.methods
      .balanceOf(Amazeng.options.address)
      .call({ gas: 6000000 });
    console.log(deposit, bal, bal > deposit);
    console.log(
      `accounts[1],
    deposit,
    startDate,
    endDate`,
      accounts[2],
      deposit,
      startDate,
      endDate
    );
    var streamReceipt = await Amazeng.methods
      .startStream(deposit, startDate, endDate)
      .send({ gas: 6000000 });
    streamId = streamReceipt.events.streamCreated.returnValues.streamId;
    console.log("streamReceipt: ", streamId);
    await increaseTime(1608120580);
  });
  it("should check user balance", async function() {
    var bal = await Sablier.methods
      .balanceOf(streamId, accounts[2])
      .call({ gas: 6000000 });
    console.log("user balance: ", new bigNumber(bal).div(10 ** 18).toFixed());
    assert.strictEqual(bal > 0, true);
  });
});

function calculateDeposit(delta, deposit) {
  var diff = deposit.minus(deposit.minus(deposit.mod(delta)));
  deposit = new bigNumber(deposit).minus(diff);
  console.log("deposit.toFixed(): ", deposit.toFixed());
  return deposit.toFixed();
}
