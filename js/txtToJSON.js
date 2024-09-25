import DLBTrie from "./DLBTrie.js";
import fs from "fs";

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
