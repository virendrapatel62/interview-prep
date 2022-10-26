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

const list1 = new LinkedList();
const list2 = new LinkedList();

list1.insertMany(1, 3, 5, 7, 9, 10, 11, 12, 13).display();
list2.insertMany(2, 4, 6, 8, 10, 14, 15, 16, 17).display();

LinkedList.mergeTwoSortedLinkedList(list1, list2).display();

const cycleList = new LinkedList();
cycleList.insertMany(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

cycleList.display();
console.log(cycleList.hasCycle());
console.log({
  cycleCreatedAt: cycleList.createRandomCycle(),
});
console.log(cycleList.hasCycle());
console.log({
  cycleLength: cycleList.getCycleLength(),
});
