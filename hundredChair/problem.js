/*
* Since the most common operations of this problem deals with circular iteration and node deletion
 * I chose to use a modified circular double linked list data structure. A double linked list
 * allows for a O(1) delete operation and and pointing the head and tail to each other allows for
 * fast looping. The modified portion refers to keeping a pointer to the current node we are at in
 * the list. I started the current node at the tail as the first operation deletes the head.
 * I used the pseudoclassical instantiation method in Javascript to create the nodes and list.
*/

//node constructor
var ListNode = function (prev, val, next) {
  this.prev = prev || null;
  this.value = val;
  this.next = next || null;
};

ListNode.prototype.delete = function () {
    this.prev.next = this.next;
    this.next.prev = this.prev;
};

var LinkedList = function () {
  this.head = null;
  this.tail = null;
  //keep track of where we are at
  this.currentNode = null;
};

// add a node to the list.
LinkedList.prototype.addNode = function (val) {
  // Empty list
  if (this.head === null && this.tail === null) {
    this.head = this.tail = new ListNode(null, val, null);
    // Not empty list.
  } else {
    this.tail = new ListNode(this.tail, val, null);
    this.tail.prev.next = this.tail;
  }

  return this.tail;
};

LinkedList.prototype.traverseList = function(val){
  var num = val;
  var start = 0;
  //start at tail
  this.currentNode = this.currentNode || this.tail;

  while(start < num){
    this.currentNode = this.currentNode.next;
    start++;
  }
};

//make list circular and populate number of chairs
var circularLinkedList = function (number){
  var list = new LinkedList();

  for(var i = 1; i <= number; i++){
    list.addNode("Chair " + i);
  }
  //making circular reference
  list.tail.next = list.head;
  list.head.prev = list.tail;

  return list;
};


var findSurvivor = function(){
  var list = circularLinkedList(100);
  var counter = 0;

  while(counter < 100){
    list.traverseList(counter);
    list.currentNode.next.delete();
    counter++;
  }

  return list.currentNode.value;
};

console.log ("Answer:", findSurvivor()); // Chair 31


//Testing
var list = circularLinkedList(3);
console.assert(list.head.value === "Chair 1", "it has numbered chairs");
console.assert(list.head.next.next.value === "Chair 3", "it has numbered chairs");
console.assert(list.head.next.next.next.value === "Chair 1", "it is circular");
list.head.next.next.delete(); //Delete Chair 3
console.assert(list.head.next.next.value === "Chair 1", "Delete occurred, it is still circular");
list.traverseList(0);
console.assert(list.currentNode.value === "Chair 3", "currentNode starts at tail");
list.traverseList(2);
console.assert(list.currentNode.value === "Chair 2", "currentNode points to different node 3->1->2");