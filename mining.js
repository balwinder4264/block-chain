const SHA256 = require('crypto-js/sha224');
class Block {
  constructor(index, timestamp, data, perviousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.perviousHash = perviousHash;
    this.hash = this.calculateHash();
    this.nounce = 0;
  }
  calculateHash() {
    return SHA256(
      this.index +
        this.perviousHash +
        this.timestamp +
        JSON.stringify(this.data) +
        this.nounce,
    ).toString();
  }
  minBlock(difficulty) {
    // return;
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')
    ) {
      console.log('left : ', this.hash.substring(0, difficulty));
      console.log('right : ', Array(difficulty + 1).join('0'));
      this.nounce++;
      this.hash = this.calculateHash();
    }
    console.log('Block mined: ', this.hash);
  }
}

class BlockChain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 3;
  }
  createGenesisBlock() {
    return new Block(0, '01/01/2017', 'Gensis block', '0');
  }
  getlatestBlock() {
    return this.chain[this.chain.length - 1];
  }
  addBlock(newBlock) {
    newBlock.perviousHash = this.getlatestBlock().hash;
    newBlock.minBlock(this.difficulty);
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
console.log('mining first block : ');
balwinderCoin.addBlock(new Block(1, '10/07/2017', {amount: 4}));
console.log('mining second block : ');
balwinderCoin.addBlock(new Block(2, '12/07/2017', {amount: 10}));
