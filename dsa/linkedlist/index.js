const { LinkedList } = require("./LinkedList");

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

const sortedList = new LinkedList();
sortedList
  .insertMany(1, 1, 1, 1, 2, 2, 3, 3, 4, 5, 6, 6, 6, 6, 6, 7, 7, 7, 8)
  .display()
  .removeDuplicateInSortedLinkedList()
  .display();
