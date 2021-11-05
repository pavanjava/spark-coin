const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(timestamp, transactions, previousHash = '') {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.computeHash();
        this.nonce = 0
    }

    computeHash = () => {
        return SHA256(this.timestamp + JSON.stringify(this.data) + this.previousHash + this.nonce).toString();
    }

    // proof of work concept using bitcoin concept of starting hash with few zeros
    mineBlock = (difficulty) => {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.computeHash();
        }
        console.log(`Block is mined: ${this.hash}`);
    }

    hasValidTransactions = () => {
        for(const tx of this.transactions){
            if(!tx.isValid()){
                return false;
            }
        }
        return true;
    }
}

module.exports = Block;