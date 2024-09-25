import DLBTrie from "./DLBTrie.js";

export default class DLBInterpreter {
  constructor() {
    this.dlb = getDLB();
  }

  getDLB() {
    fetch("data/dlb.json")
      .then((response) => response.json())
      .then((data) => {
        return DLBTrie.deserialize(JSON.stringify(data));
      });
  }
}
