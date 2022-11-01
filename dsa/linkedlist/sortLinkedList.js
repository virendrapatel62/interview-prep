const { LinkedList } = require("./LinkedList");

const Node = class {
  constructor(value) {
    this.value = value;
    this.next = null;
  }

  display() {
    let temp = this;
    const array = [];
    while (temp) {
      array.push(temp.value);
      temp = temp.next;
    }

    console.log(array.join("=>"));
  }

  append(value) {
    let temp = this;

    while (temp.next) {
      temp = temp.next;
    }

    temp.next = new Node(value);
    return this;
  }
};

const findMidNode = (head) => {
  let fast = head;
  let slow = head;
  let midPrev = null;

  if (!head || !head.next) return head;

  while (slow && fast?.next) {
    fast = fast?.next?.next;
    midPrev = slow;
    slow = slow.next;
  }

  midPrev.next = null;
  return slow;
};

const mergeLinkdedList = (left, right) => {
  const dummyHead = new Node();

  let tail = dummyHead;
  while (left && right) {
    if (left.value < right.value) {
      tail.next = left;
      left = left.next;
      tail = tail.next;
    } else {
      tail.next = right;
      right = right.next;
      tail = tail.next;
    }
  }

  while (left) {
    tail.next = left;
  }

  while (right) {
    tail.next = right;
  }
  //   }

  return dummyHead.next;
};

const sortLinkedList = (head) => {
  if (!head.next) return;

  const mid = findMidNode(head);

  const right = sortLinkedList(head);
  const left = sortLinkedList(mid);
  return mergeLinkdedList(right, left);
};

const listNode = new Node(10);
const listNode2 = new Node(10);

listNode.append(9).append(8).append(3).append(4).append(2).append(0).append(1);
listNode2.append(9).append(8).append(3).append(4).append(2).append(0).append(1);

listNode.display();
// const list = sortLinkedList(listNode);
// list.display();

console.log(mergeLinkdedList(listNode, listNode2).display());
