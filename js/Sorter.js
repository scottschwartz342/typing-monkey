export default class Sorter {
  constructor(arr) {
    this.arr = arr;
    this.longestWord = [...this.arr].sort((a, b) => b.length - a.length);
    this.shortestWord = [...this.arr].sort((a, b) => a.length - b.length);
  }
}
