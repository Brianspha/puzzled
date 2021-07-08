require("dotenv").config({
  path: "config/testnet/vars.env",
  encoding: "utf8",
});
const bigNumber = require("bignumber.js");
let initialAmount = new bigNumber(991112121212111231190990211212).toFixed();
module.exports = {
  // default applies to all environments
  default: {
    // order of connections the dapp should connect to
    dappConnection: [
      "$WEB3", // uses pre existing web3 object if available (e.g in Mist)
      "ws://localhost:8546",
      "http://localhost:8545",
    ],

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
      CTokenManager: {
        args: [],
      },
      Sablier: {
        deps: ["ERC20"],
        args: ["$CTokenManager"],
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
      console.log("deps.contracts.TournamentContract.options.address: ",deps.contracts.TournamentContract.options.address)
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
          gas: 800000,
        });
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
          gas: 800000,
        });
      console.log("deployed contract!!!");
      console.log("contracts: ", web3.eth.defaultAccount);
      await deps.contracts.Amazeng.methods
        .init(
          deps.contracts.ERC20.options.address,
          deps.contracts.Sablier.options.address
        )
        .send({
          gas: 800000,
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
          gas: 800000,
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
          gas: 800000,
        });
      console.log("approved Amazeng contract...");
    },
  },
  matic: {
    gas: "6000000",
    strategy: "explicit",
    deploy: {
      CTokenManager: {
        args: [],
      },
      Sablier: {
        deps: ["ERC20"],
        args: ["$CTokenManager"],
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
      console.log("deps.contracts.TournamentContract.options.address: ",deps.contracts.TournamentContract.options.address)
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
          gas: 800000,
        });
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
          gas: 800000,
        });
      console.log("deployed contract!!!");
      console.log("contracts: ", web3.eth.defaultAccount);
      await deps.contracts.Amazeng.methods
        .init(
          deps.contracts.ERC20.options.address,
          deps.contracts.Sablier.options.address
        )
        .send({
          gas: 800000,
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
          gas: 800000,
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
          gas: 800000,
        });
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
