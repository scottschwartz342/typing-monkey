const fs = require("fs");

class DLBNode {
  constructor(value = null) {
    this.value = value;
    this.child = null;
    this.sibling = null;
    this.isEndOfWord = false;
  }
}

class DLBTrie {
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
    while (current.value !== char && current.sibling !== null) {
      current = current.sibling;
    }

    if (current.value === char) {
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

// Load dictionary words from a .txt file
const words = fs
  .readFileSync("assets/dict17k.txt", "utf8")
  .split("\n")
  .map((word) => word.trim());

// Build the DLB Trie and insert words
let dictionaryTrie = new DLBTrie();
words.forEach((word) => dictionaryTrie.insert(word));

// Serialize the DLB Trie into a JSON string
const serializedDLB = dictionaryTrie.serialize();

// Write the serialized DLB to a file
fs.writeFileSync("data/dlb.json", serializedDLB);
