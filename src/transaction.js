const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;

const ec = new EC('secp256k1');

class Transaction {



    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }

    computeHash = () => {
        return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
    }

    signTransaction = (signKey) => {
        if(signKey.getPublic('hex') !== this.fromAddress){
            throw new Error('can not sign the transaction of other wallets');
        }
        const trnxHash = this.computeHash();
        const sign = signKey.sign(trnxHash,'base64');
        this.signature = sign.toDER('hex');
    }

    isValid = () => {
        if(this.fromAddress === null){
            return true;
        }
        if(!this.signature || this.signature.length === 0){
            throw new Error('No signature');
        }
        const publicKey = ec.keyFromPublic(this.fromAddress,'hex');
        return publicKey.verify(this.computeHash(), this.signature);
    }
}

module.exports = Transaction;