const Election = artifacts.require("election");
const biconomyForwarder = require("../list/biconomyForwarder.json");

module.exports = function (deployer, network) {
  const getBiconomyForwarderByNetwork = biconomyForwarder[network];
  if (getBiconomyForwarderByNetwork) {
    deployer.deploy(Election, getBiconomyForwarderByNetwork);
  } else {
    console.log("No Biconomy Forwarder Found in the desired network!");
  }
};
