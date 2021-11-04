const Block = require('./block');

class BlockChain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock = () => {
        return new Block('0', new Date().toLocaleDateString(), {}, '');
    }

    getLatestBlock = () => {
        return this.chain[this.chain.length - 1];
    }

    addTransactions = (newBlock) => {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.computeHash();
        this.chain.push(newBlock);
    }
}

module.exports = BlockChain;