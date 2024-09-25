export default class DLBNode {
  constructor(value = null) {
    this.value = value;
    this.child = null;
    this.sibling = null;
    this.isEndOfWord = false;
  }
}
