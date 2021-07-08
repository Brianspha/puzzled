// This file contains only the basic configuration you need to run Embark's node
// For additional configurations, see: https://framework.embarklabs.io/docs/blockchain_configuration.html
require("dotenv").config();
console.log("matic: ",process.env.MATIC_PROVIDER_URL, " process.env.PRIVATE_KEY: ",process.env.PRIVATE_KEY)
module.exports = {
  // default applies to all environments
  default: {
    warnIfMetamask: true,

    enabled: true,
    client: "ganache-cli", // Can be geth or parity (default:geth)
  },
  development: {
    client: "ganache-cli",
    clientConfig: {
      miningMode: "dev", // Mode in which the node mines. Options: dev, auto, always, off
    },
  },
  privateparitynet: {
    client: "parity",
    genesisBlock: "config/privatenet/genesis-parity.json",
    datadir: ".embark/privatenet/datadir",
    miningMode: "off",
  },
  externalnode: {
    endpoint: "URL_OF_THE_NODE", // Endpoint of an node to connect to. Can be on localhost or on the internet
    accounts: [
      {
        mnemonic: "YOUR_MNEMONIC",
        hdpath: "m/44'/60'/0'/0/",
        numAddresses: "1",
      },
    ],
  },

  testnet: {
    networkType: "testnet", // Can be: testnet(ropsten), rinkeby, livenet or custom, in which case, it will use the specified networkId
    syncMode: "light",
    accounts: [
      {
        nodeAccounts: true,
        password: "config/testnet/password",
      },
    ],
  },

  livenet: {
    networkType: "livenet",
    syncMode: "light",
    accounts: [
      {
        nodeAccounts: true,
        password: "config/livenet/password",
      },
    ],
  },
  matic: {
    endpoint: process.env.GOERLI_PROVIDER_URL,
    accounts: [
      {
        privateKey: process.env.PRIVATE_KEY,
      },
    ],
  },

  // you can name an environment with specific settings and then specify with
  // "embark run custom_name" or "embark blockchain custom_name"
  //custom_name: {
  //}
};
