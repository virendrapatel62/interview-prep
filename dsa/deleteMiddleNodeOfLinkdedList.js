const { LinkedList } = require("./linkedlist/LinkedList");

var deleteMiddle = function (head) {
  // find middle node;

  let slow = head;
  let fast = head;

  let prevOfMiddle = slow;

  while (slow && fast?.next) {
    prevOfMiddle = slow;
    slow = slow.next;
    fast = fast.next.next;
  }

  if (slow) {
    prevOfMiddle.next = slow.next;
  }

  if (slow == head) return null;

  return head;
};

const list = new LinkedList();
list.insertMany(1, 2, 3, 4);
list.display();
deleteMiddle(list.head);
list.display();
