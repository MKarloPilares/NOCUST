const ChainClone = artifacts.require("ChainClone")
const ERC20TokenImplementation = artifacts.require("ERC20TokenImplementation")

const LQD_TOKEN_ADDRESS = "0x7262A0662d4947AdC09a4f7752D820eF63d6a3c5"
const NOCUST_CLONE_ADDRESS = "0x4f2283028A8cE4308b5cFbF90D991Aec76f79b8A"
const NEW_CLONE = "0xa9F2Bb3E3B69cFd5C06C03160903fCFF14e6C445"

contract("ChainClone", accounts => {
    let owner = accounts[0]
    let minBalance = web3.utils.toWei('10')
    
    it("Current account is Ganache Account[0]", async () => {
        assert.equal(owner.toString(), '0xD933fAf1627a2870a460a59Dc09D720878C3E869');
    });

    it("Account[0] balance is more than 10", async () => {
        let accountBalance = await web3.eth.getBalance(owner);
        console.log('Account ETHBalance: ', web3.utils.fromWei(accountBalance, 'ether'))
        console.log('Minimum Balance: ', web3.utils.fromWei(minBalance, 'ether'))
        assert(accountBalance >= minBalance);
    });

    it("Set the CloneChain NOCUSTCommitchain address", async () => {
        ChainCloneInstance = await ChainClone.deployed(NOCUST_CLONE_ADDRESS)
        //console.log(NOCUSTinstance)
        let result = await ChainCloneInstance.setLibraryAddress.sendTransaction("0x3e3b350941c1f48ef413D1a85f14bBD9168F374B")
        console.log(result.receipt)
    });

    it("Clone the existing NOCUSTCommitchain contract", async () => {
        ChainCloneInstance = await ChainClone.deployed(NOCUST_CLONE_ADDRESS)
        //console.log(NOCUSTinstance)
        let result = await ChainCloneInstance.createClone.sendTransaction("10800")
        console.log(result.receipt)
    });
    

    it("Get Clone Contracts", async () => {
        ChainCloneInstance = await ChainClone.deployed(NOCUST_CLONE_ADDRESS)
        //console.log(NOCUSTinstance)
        let result = await ChainCloneInstance.getChains()
        console.log(result.receipt)
    });

    it("Deposit ETH is working", async () => {
        ChainCloneInstance = await ChainClone.deployed(NEW_CLONE)
        //console.log(NOCUSTinstance)
        let result = await ChainCloneInstance.deposit.sendTransaction(ChainCloneInstance.address, owner, web3.utils.toWei('1', 'ether'))
        console.log(result.receipt)
    });
    
    
    it("Account[0] LQD balance is more than 100", async () => {
        ERC20instance = await ERC20TokenImplementation.deployed(LQD_TOKEN_ADDRESS)
        LQDBalance = await ERC20instance.balanceOf(owner)
        console.log('Account LQD Balance: ', web3.utils.fromWei(LQDBalance, 'ether'))
        console.log('Minimum Balance: ', web3.utils.fromWei(minBalance, 'ether'))
        assert(LQDBalance >= minBalance);
    });
    /*
    it("LQD is added via RegisterERC20", async () => {
        NOCUSTinstance = await NOCUSTCommitChain.deployed(NOCUST_ADDRESS);
        await NOCUSTinstance.registerERC20(LQD_TOKEN_ADDRESS)
    });
    */

    it("NOCUST contract approved for ERC20 transferFrom", async () => {
        ERC20instance = await ERC20TokenImplementation.deployed(LQD_TOKEN_ADDRESS)
        await ERC20instance.approve(NOCUST_CLONE_ADDRESS, web3.utils.toWei('1000'))
        const allowance = await ERC20instance.allowance(owner, NEW_CLONE)
        console.log('Allowance', web3.utils.fromWei(allowance, 'ether'))
    });
    
    it("Deposit LQD is working", async () => {
        ChainCloneInstance = await ChainClone.deployed(NEW_CLONE);
        ERC20instance = await ERC20TokenImplementation.deployed(LQD_TOKEN_ADDRESS);
        //console.log(ERC20instance)
        let result = await ChainCloneInstance.deposit.sendTransaction(ERC20instance.address, owner, web3.utils.toWei('1', 'ether'));
        console.log(result.receipt)
    });
})