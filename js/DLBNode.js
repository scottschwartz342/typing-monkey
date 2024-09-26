export default class DLBNode {
  constructor(charValue = null) {
    this.charValue = charValue;
    this.child = null;
    this.sibling = null;
    this.isEndOfWord = false;
  }
}
