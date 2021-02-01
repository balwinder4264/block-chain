const SHA256 = require('crypto-js/sha224');
class Block {
  constructor(index, timestamp, data, perviousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.perviousHash = perviousHash;
    this.hash = this.calculateHash();
  }
  calculateHash() {
    return SHA256(
      this.index +
        this.perviousHash +
        this.timestamp +
        JSON.stringify(this.data),
    ).toString();
  }
}

class BlockChain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }
  createGenesisBlock() {
    return new Block(0, '01/01/2017', 'Gensis block', '0');
  }
  getlatestBlock() {
    return this.chain[this.chain.length - 1];
  }
  addBlock(newBlock) {
    newBlock.perviousHash = this.getlatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }
  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
      if (currentBlock.perviousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}
let balwinderCoin = new BlockChain();
balwinderCoin.addBlock(new Block(1, '10/07/2017', {amount: 4}));
balwinderCoin.addBlock(new Block(2, '12/07/2017', {amount: 10}));
// console.log(JSON.stringify(balwinderCoin, null, 4));
console.log('is chain valid ', balwinderCoin.isChainValid());
balwinderCoin.chain[1].data = {amount: 100};
balwinderCoin.chain[1].hash = balwinderCoin.chain[1].calculateHash();
console.log('is chain valid ', balwinderCoin.isChainValid());
