require("dotenv").config();
console.log("MATIC_PROVIDER_URL: ", process.env.MATIC_PROVIDER_URL);
// This file contains only the basic configuration you need to run Embark's node
// For additional configurations, see: https://framework.embarklabs.io/docs/blockchain_configuration.html
module.exports = {
  default: {
    warnIfMetamask: true,

    enabled: true,
    client: "ganache-cli", // Can be geth or parity (default:geth)
  },

  development: {
    rpcHost: "http://localhost",
    rpcPort: "8546",
    endpoint: "http://localhost:8546",
  },
  // default applies to all environments
  binance: {
    rpcHost: "https://data-seed-prebsc-1-s1.binance.org",
    rpcPort: "8545",
    endpoint: process.env.BINANCE_PROVIDER_URL,
    accounts: [
      {
        privateKey: process.env.P_KEY,
      },
    ],
  },
  matic: {
    endpoint: process.env.MATIC_PROVIDER_URL,
    accounts: [
      {
        privateKey: process.env.P_KEY_GOERLI
      },
    ],
  },
  harmony: {
    endpoint: process.env.HARMONY_PROVIDER_URL,
    accounts: [
      {
        privateKey: process.env.HARMONY_P_KEY
      },
    ],
  }
  // you can name an environment with specific settings and then specify with
  // "embark run custom_name" or "embark blockchain custom_name"
  //custom_name: {
  //}
};
