const BlockChain = require('./block-chain');
const Block = require('./block');
const Transaction = require('./transaction');

/**
 * {
 *     toAddress: address_to_wallet,
 *     fromAddress: address_to_wallet,
 *     amount: bitCoins or Ethers
 * }
 *
 */
const sCoin = new BlockChain();
sCoin.createTransaction(new Transaction('addr1','addr2',30));
sCoin.createTransaction(new Transaction('addr2','addr3',130));
sCoin.createTransaction(new Transaction('addr2','addr1',300));
sCoin.createTransaction(new Transaction('addr1','addr4',230));

console.log(`Starting the miner......`);
sCoin.minePendingTransactions('9949493991');
console.log(`my rewards: ${sCoin.checkBalance('9949493991')}`);

console.log(`Starting the miner again......`);
sCoin.minePendingTransactions('9949493991');
console.log(`my rewards: ${sCoin.checkBalance('9949493991')}`);

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
