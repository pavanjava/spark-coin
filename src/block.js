const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.computeHash();
        this.nonce = 0
    }

    computeHash = () => {
        return SHA256(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash + this.nonce).toString();
    }

    // proof of work concept using bitcoin concept of starting hash with few zeros
    mineBlock = (difficulty) => {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.computeHash();
        }
        console.log(`Block is mined: ${this.hash}`);
    }
}

module.exports = Block;