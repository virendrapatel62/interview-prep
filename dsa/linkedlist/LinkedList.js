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
  }
}

const list = new LinkedList();

list
  .addToLast(11)
  .addToLast(13)
  .addToFirst(10)
  .addToFirst(7)
  .insert(6, 0)
  .insert(15, 5)
  .insert(14, 6)
  .display();

console.log({
  head: list.head.data,
  tail: list.tail.data,
  size: list.size,
});
