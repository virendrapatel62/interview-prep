class LinkedListNode {
  data;
  next;
  prev;
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }

  get value() {
    return this.data;
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

  createRandomCycle() {
    const index1 = Math.floor(Math.random() * this.size);
    const node = this.getNode(index1);
    const last = this.getNode(this.size - 1);
    last.next = node;
    return node.value;
  }

  getCycleLength() {
    let slow = this.head;
    let fast = this.head;

    let length = 0;

    while (slow && fast.next) {
      slow = slow.next;
      fast = fast.next.next;

      if (!fast) return 0;

      if (slow == fast) {
        break;
      }
    }

    if (!slow || !fast.next) return 0;

    do {
      slow = slow.next;
      length++;
    } while (fast != slow);

    console.log("returning...");
    return length;
  }

  getCycleStartNode() {
    let first = this.head;
    let second = this.head;
    const lengthOfCycle = this.getCycleLength();

    console.log({ lengthOfCycle });

    for (let index = 0; index < lengthOfCycle; index++) {
      first = first.next;
    }

    while (second != first) {
      first = first.next;
      second = second.next;
    }

    return first.value;
  }

  hasCycle() {
    let slow = this.head;
    let fast = this.head;

    while (slow && fast) {
      slow = slow.next;
      fast = fast?.next?.next;
      if (slow == fast) {
        return true;
      }
    }

    return false;
  }

  static mergeTwoSortedLinkedList(list1, list2) {
    const list = new LinkedList();

    let head1 = list1.head,
      head2 = list2.head;

    while (head1 && head2) {
      console.log(head1.value, head2.value);
      if (head1.value < head2.value) {
        list.addToLast(head1.value);
        head1 = head1.next;
      } else {
        list.addToLast(head2.value);
        head2 = head2.next;
      }
    }

    while (head1) {
      list.addToLast(head1.value);
      head1 = head1.next;
    }

    while (head2) {
      list.addToLast(head2.value);
      head2 = head2.next;
    }

    return list;
  }
}
module.exports = {
  LinkedList,
};
