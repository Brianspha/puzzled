require("dotenv").config();
const bigNumber = require("bignumber.js");
let initialAmount = new bigNumber(991112121212111231190990211212).toFixed();
module.exports = {
  // default applies to all environments
  default: {
    library: "embarkjs", // can also be 'web3'

    // order of connections the dapp should connect to
    dappConnection: ["$WEB3"],

    // Automatically call `ethereum.enable` if true.
    // If false, the following code must run before sending any transaction: `await EmbarkJS.enableEthereum();`
    // Default value is true.
    // dappAutoEnable: true,

    gas: "auto",

    // Strategy for the deployment of the contracts:
    // - implicit will try to deploy all the contracts located inside the contracts directory
    //            or the directory configured for the location of the contracts. This is default one
    //            when not specified
    // - explicit will only attempt to deploy the contracts that are explicitly specified inside the
    //            contracts section.
    // strategy: 'implicit',

    // minimalContractSize, when set to true, tells Embark to generate contract files without the heavy bytecodes
    // Using filteredFields lets you customize which field you want to filter out of the contract file (requires minimalContractSize: true)
    // minimalContractSize: false,
    // filteredFields: [],
    deploy: {
      Sablier: {
        deps: ["ERC20"],
        args: ["$CTokenManager"],
      },
      CTokenManager: {
        args: [],
      },
      Amazeng: {
        deps: ["ERC20", "Sablier"],
      },
      ERC20: {
        args: ["PT", "PToken", 18, initialAmount],
      },
      TournamentContract: {
        args: ["$ERC20"],
        deps: ["ERC20", "Amazeng"],
      },
    },
    afterDeploy: async (deps) => {
      var Web3 = require("web3");
      var tempWeb3 = new Web3(web3.givenProvider);
      tempWeb3.eth
        .getBalance("0x86571d9b9a7B4510FC6a16633F0D36c015881b19")
        .then(console.log);
      console.log("contracts: ", web3.eth.defaultAccount);
      await deps.contracts.ERC20.methods
        .approve(
          deps.contracts.TournamentContract.options.address,
          new bigNumber(
            new bigNumber(
              new bigNumber(991112121212111231190990211212).toFixed()
            ).dividedBy(2)
          ).toFixed()
        )
        .send({
          from: tempWeb3.eth.defaultAccount,
        });
      console.log("contracts1: ", web3.eth.defaultAccount);
      await deps.contracts.ERC20.methods
        .transfer(
          deps.contracts.TournamentContract.options.address,
          new bigNumber(
            new bigNumber(
              new bigNumber(991112121212111231190990211212).toFixed()
            ).dividedBy(2)
          ).toFixed()
        )
        .send({
          from: tempWeb3.eth.defaultAccount,
        });
      console.log("deployed contract!!!");
      await deps.contracts.Amazeng.methods
        .init(
          deps.contracts.ERC20.options.address,
          deps.contracts.Sablier.options.address
        )
        .send({
          from: tempWeb3.eth.defaultAccount,
        });
      await deps.contracts.ERC20.methods
        .approve(
          deps.contracts.Amazeng.options.address,
          new bigNumber(
            new bigNumber(
              new bigNumber(991112121212111231190990211212).toFixed()
            ).dividedBy(2)
          ).toFixed()
        )
        .send({
          from: tempWeb3.eth.defaultAccount,
        });
      await deps.contracts.ERC20.methods
        .transfer(
          deps.contracts.Amazeng.options.address,
          new bigNumber(
            new bigNumber(
              new bigNumber(991112121212111231190990211212).toFixed()
            ).dividedBy(2)
          ).toFixed()
        )
        .send({
          from: tempWeb3.eth.defaultAccount,
        });
      console.log("approved Amazeng contract...");
    },
  },
  matic: {
    strategy: "explicit",
    gas: "auto",
    deploy: {
      Sablier: {
        deps: ["ERC20"],
        args: ["$CTokenManager"],
      },
      CTokenManager: {
        args: [],
      },
      Amazeng: {
        deps: ["ERC20", "Sablier"],
      },
      ERC20: {
        args: ["PT", "PToken", 18, initialAmount],
      },
      TournamentContract: {
        args: ["$ERC20"],
        deps: ["ERC20", "Amazeng"],
      },
    },
    afterDeploy: async (deps) => {
      await deps.contracts.ERC20.methods
        .approve(
          deps.contracts.TournamentContract.options.address,
          new bigNumber(new bigNumber(initialAmount).dividedBy(2)).toFixed()
        )
        .send();
      console.log("contracts1: ", web3.eth.defaultAccount);
      await deps.contracts.ERC20.methods
        .transfer(
          deps.contracts.TournamentContract.options.address,
          new bigNumber(new bigNumber(initialAmount).dividedBy(2)).toFixed()
        )
        .send();
      console.log("deployed contract!!!");
      await deps.contracts.Amazeng.methods
        .init(
          deps.contracts.ERC20.options.address,
          deps.contracts.Sablier.options.address
        )
        .send();
      await deps.contracts.ERC20.methods
        .approve(
          deps.contracts.Amazeng.options.address,
          new bigNumber(new bigNumber(initialAmount).dividedBy(2)).toFixed()
        )
        .send();
      await deps.contracts.ERC20.methods
        .transfer(
          deps.contracts.Amazeng.options.address,
          new bigNumber(new bigNumber(initialAmount).dividedBy(2)).toFixed()
        )
        .send();
      console.log("approved Amazeng contract...");
    },
  },
  // default environment, merges with the settings in default
  // assumed to be the intended environment by `embark run`
  development: {
    dappConnection: [
      "ws://localhost:8546",
      "http://localhost:8545",
      "$WEB3", // uses pre existing web3 object if available (e.g in Mist)
    ],
  },

  // merges with the settings in default
  // used with "embark run privatenet"
  privatenet: {},

  // merges with the settings in default
  // used with "embark run testnet"
  testnet: {},

  // merges with the settings in default
  // used with "embark run livenet"
  livenet: {},

  // you can name an environment with specific settings and then specify with
  // "embark run custom_name" or "embark blockchain custom_name"
  // custom_name: {}
};
