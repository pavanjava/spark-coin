const BlockChain = require('./block-chain');
const Block = require('./block');

/**
 * {
 *     toAddress: address_to_wallet,
 *     fromAddress: address_to_wallet,
 *     amount: bitCoins or Ethers
 * }
 *
 */
const sCoin = new BlockChain();
sCoin.addTransactions(new Block(1,new Date().toLocaleDateString(),{toAddress: 'gasdhgfyte', fromAddress: 'qwerqwrwq', amount: '$30'}));
sCoin.addTransactions(new Block(2,new Date().toLocaleDateString(),{toAddress: 'sdsdkfhmfn', fromAddress: 'tiyuiotyur', amount: '$100'}));

console.log(sCoin.chain);
