// SPDX-License-Identifier: MIT
pragma solidity 0.4.26;

import "./Ownable.sol";
import "./CloneFactory.sol";
import "./NOCUSTCommitChain.sol";

contract ChainCloneFactory is CloneFactory, Ownable {
    NOCUSTCommitChain[] public CommitChainAddresses;
    event CloneCreated(NOCUSTCommitChain chainClone);

    address public libraryAddress;
    address private chainCloneOwner;

    constructor(address _chainCloneOwner) public {
        chainCloneOwner = _chainCloneOwner;
    }

    function setLibraryAddress(address _libraryAddress) external onlyOwner {
        libraryAddress = _libraryAddress;
    }

    function createClone(uint256 blocksPerEon) external {
        NOCUSTCommitChain chainClone = NOCUSTCommitChain(
            createClone(libraryAddress)
        );
        NOCUSTCommitChain(chainClone).initialize(blocksPerEon, libraryAddress);

        CommitChainAddresses.push(chainClone);
        emit CloneCreated(chainClone);
    }

    function getChains() external view returns (NOCUSTCommitChain[] memory) {
        return CommitChainAddresses;
    }
}