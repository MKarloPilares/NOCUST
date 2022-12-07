var ERC20TokenImplementation = artifacts.require("ERC20TokenImplementation");

module.exports = async function(deployer) {
  deployer.deploy(ERC20TokenImplementation);
};