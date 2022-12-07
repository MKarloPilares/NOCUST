var ChainClone = artifacts.require("ChainClone");

module.exports = function(deployer) {
 deployer.deploy(ChainClone, "0xe15DD4937152554422358786c0d615cb224CEa1E");
}