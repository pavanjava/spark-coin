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

    // add new transaction/blocks to the chain
    addTransactions = (newBlock) => {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.computeHash();
        this.chain.push(newBlock);
    }

    // to check the validity of the chain
    isChainValid = () => {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.computeHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

module.exports = BlockChain;