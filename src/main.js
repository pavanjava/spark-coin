const BlockChain = require('./block-chain');
const Block = require('./block');
const Transaction = require('./transaction');
const EC = require('elliptic').ec;

const ec = new EC('secp256k1');

/**
 * {
 *     toAddress: address_to_wallet,
 *     fromAddress: address_to_wallet,
 *     amount: bitCoins or Ethers
 * }
 *
 */

const myKey = ec.keyFromPrivate('d8d1e35cb883fd1dadcc9f61712a590837cadc0b7ed68f436e0ef5509e450ab7');
const myWalletAddress = myKey.getPublic('hex');

const sCoin = new BlockChain();
const trx1 = new Transaction(myWalletAddress,'to address public key',300);
trx1.signTransaction(myKey);
sCoin.addTransaction(trx1);

console.log(`Starting the miner......`);
sCoin.minePendingTransactions(myWalletAddress);
console.log(`my rewards: ${sCoin.checkBalance(myWalletAddress)}`);


console.log(sCoin.chain);
console.log(`Is Chain valid ? ${sCoin.isChainValid()}`);

/*console.log(`Mining block 1`);
sCoin.addTransactions(new Block(1,new Date().toLocaleDateString(),{toAddress: 'gasdhgfyte', fromAddress: 'qwerqwrwq', amount: '$30'}));

console.log(`Mining block 2`);
sCoin.addTransactions(new Block(2,new Date().toLocaleDateString(),{toAddress: 'sdsdkfhmfn', fromAddress: 'tiyuiotyur', amount: '$100'}));

console.log(sCoin.chain);*/

/*
console.log(`Is Chain valid ? ${sCoin.isChainValid()}`);

//Tamper the data for one of the blocks
sCoin.chain[1].data = {toAddress: 'gasdhgfyte', fromAddress: '9949493991', amount: '$300'};
//recompute the hash
sCoin.chain[1].computeHash();

console.log(`Is Chain valid ? ${sCoin.isChainValid()}`);*/
