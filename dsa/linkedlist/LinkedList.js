class LinkedListNode {
  data;
  next;
  prev;
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}
class LinkedList {
  constructor() {
    this.size = 0;
    this.head = null;
    this.tail = null;
  }

  insert(data, index) {
    if (index == undefined) return null;

    if (index > this.size) return null;

    if (index == 0) return this.addToFirst(data);

    if (index == this.size) return this.addToLast(data);

    const newNode = new LinkedListNode(data);
    const prevNode = this.getNode(index - 1);
    newNode.next = prevNode.next;
    prevNode.next = newNode;
    this.size++;
    return this;
  }

  addToLast(data) {
    if (this.head) {
      const node = new LinkedListNode(data);
      let temp = this.getNode(this.size - 1);
      temp.next = node;
      this.tail = node;
      this.size++;
      return this;
    }

    return this.addToFirst(data);
  }

  getNode(index) {
    if (index === undefined) return null;

    if (index >= this.size) return null;

    let node = this.head;
    for (let i = 0; i < index; i++) {
      node = node.next;
    }
    return node;
  }

  addToFirst(data) {
    const node = new LinkedListNode();
    node.data = data;
    if (this.head) {
      node.next = this.head;
      this.head = node;
      this.size++;
      return this;
    }
    this.head = node;
    this.tail = node;
    this.size++;
    return this;
  }

  display() {
    let node = this.head;
    let list = ``;
    while (node) {
      list += node.data + "=>";
      node = node.next;
    }

    console.log(list + "END");
    return this;
  }

  insertMany(...values) {
    for (const value of values) {
      this.addToLast(value);
    }
    return this;
  }

  removeDuplicateInSortedLinkedList() {
    let node = this.head;

    while (node.next) {
      if (node.data == node.next.data) {
        node.next = node.next.next;
      } else {
        node = node.next;
      }
    }

    return this;
  }
}
module.exports = {
  LinkedList,
};
