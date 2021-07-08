const bigNumber = require("bignumber.js");
const intialAmount = new bigNumber(9900000000000000000000 * 10 ** 18).toFixed();
console.log("initialAmount: ", intialAmount);
require("dotenv").config();
console.log("process.env: ", process.env.GAME_KEY);
const utils = require("web3-utils");
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
    strategy: 'explicit',
    deploy: {},
  },
  

  // default environment, merges with the settings in default
  // assumed to be the intended environment by `embark run`

  // you can name an environment with specific settings and then specify with
  // "embark run custom_name" or "embark blockchain custom_name"
  // custom_name: {}
};
