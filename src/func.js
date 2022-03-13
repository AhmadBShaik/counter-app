import CounterJSON from '../build/contracts/Counter.json'
import Web3 from 'web3'

const contract = require('@truffle/contract')

export const load = async () => {
    await loadWeb3();
    const { accountAddress, counterContract} = await loadAccount();

    return { accountAddress, counterContract};
};

const loadAccount = async () => {
    const accountAddress = await web3.eth.getCoinbase();
    const {counterContract, currentCount} = await loadContract()
    return { accountAddress, counterContract, currentCount};
}

// const getContractMethods = async (counterContract) => {
//     const getMethods = {
//         getCount:counterContract.getCount().then(e=>e.toNumber())
//     }

//     return { getMethods }
// }

const loadContract = async () => {
    const ctrt = contract(CounterJSON)
    ctrt.setProvider(web3.eth.currentProvider)
    const counterContract = await ctrt.deployed();
    // const { getMethods } = await getContractMethods(counterContract)
    return { counterContract }
}

const loadWeb3 = async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
            // Acccounts now exposed
            web3.eth.sendTransaction({/* ... */});
        } catch (error) {
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */});
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

}