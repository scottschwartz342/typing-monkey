import DLBNode from "./DLBNode.js";

export default class DLBTrie {
  constructor() {
    this.root = new DLBNode();
  }

  insert(word) {
    let node = this.root;
    for (let char of word) {
      node = this._insertChar(node, char);
    }
    node.isEndOfWord = true;
  }

  _insertChar(node, char) {
    if (node.child === null) {
      node.child = new DLBNode(char);
      return node.child;
    }

    let current = node.child;
    while (current.charValue !== char && current.sibling !== null) {
      current = current.sibling;
    }

    if (current.charValue === char) {
      return current;
    }

    current.sibling = new DLBNode(char);
    return current.sibling;
  }

  serialize() {
    return JSON.stringify(this.root);
  }

  static deserialize(jsonData) {
    const trie = new DLBTrie();
    trie.root = JSON.parse(jsonData);
    return trie;
  }
}
