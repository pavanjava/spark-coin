const Block = require('./block');
const Transaction = require('./transaction');

class BlockChain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 5;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock = () => {
        return new Block(new Date().toLocaleDateString(), [], '');
    }

    getLatestBlock = () => {
        return this.chain[this.chain.length - 1];
    }

    // add new transaction/blocks to the chain
    /*addTransactions = (newBlock) => {
        newBlock.previousHash = this.getLatestBlock().hash;
        //newBlock.hash = newBlock.computeHash();
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }*/

    minePendingTransactions = (miningRewardAddress) => {
        let block = new Block(Date.now(), this.pendingTransactions);
        block.previousHash = this.getLatestBlock().hash;
        block.mineBlock(this.difficulty);

        console.log(`block successfully mined`);
        this.chain.push(block);
        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ]
    }

    createTransaction = (transaction) => {
        this.pendingTransactions.push(transaction);
    }

    checkBalance = (address) => {
        let balance = 0;

        for(const block of this.chain){
            for(const transaction of block.transactions){
                if(transaction.fromAddress === address){
                    balance -= transaction.amount;
                }
                if(transaction.toAddress === address){
                    balance += transaction.amount;
                }
            }
        }

        return balance;
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