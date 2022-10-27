const { LinkedList } = require("./linkedlist/LinkedList");

var middleNode = function (head) {
  let slow = head;
  let fast = head;

  while (slow && fast?.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
};

const list = new LinkedList();

list.insertMany(1, 2, 3, 4, 5);

list.display();

console.log(middleNode(list.head));
