import DLBTrie from "./DLBTrie.js";

export default class DLBInterpreter {
  constructor() {
    this.dlb = null;
    this.rootNode = null;
    this.currNode = null;
    this.currString = "";

    this.initAsyncConstructors();
  }

  async initAsyncConstructors() {
    this.dlb = await this.getDLB();
    this.rootNode = this.dlb.root;
    this.currNode = this.rootNode;
  }

  async getDLB() {
    return fetch("data/dlb.json")
      .then((response) => response.json())
      .then((data) => DLBTrie.deserialize(JSON.stringify(data)));
  }

  // the goal is to leave currNode on the proper node
  addChar(char) {
    this.currString += char;

    // move down to next level
    if (this.currNode.child) {
      this.currNode = this.currNode.child;
    } else {
      this.currNode = "Out of bounds";
      return;
    }

    // if we are on the right node we done
    if (char === this.currNode.charValue) {
      return;
    }

    // now need to go through siblings
    while (this.currNode.sibling && char !== this.currNode.charValue) {
      this.currNode = this.currNode.sibling;
    }

    if (char !== this.currNode.charValue) {
      this.currNode = "Out of bounds";
    }
  }

  isPrefixIsWord() {
    if (this.currNode == "Out of bounds") {
      return 0;
    }

    let isPrefix = !!this.currNode.child;
    let isWord = this.currNode.isEndOfWord;

    if (!isPrefix && !isWord) {
      return 0;
    } else if (!isPrefix && isWord) {
      return 1;
    } else if (isPrefix && !isWord) {
      return 2;
    } else {
      return 3;
    }
  }

  getDLBUsed() {
    return this.dlb;
  }

  reset() {
    this.initAsyncConstructors();
    this.currString = "";
  }
}
