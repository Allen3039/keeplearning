function getLinkList() {
  var startNode = {
    data: {
      key: '',
      value: NaN,
    },
    next: null,
  };
  var length = 0;
  return {
    startNode,
    getNodeByKey(key) {
      let currentNode = startNode;
      let ret = null;
      while (currentNode) {
        if (currentNode.data.key === key) {
          ret = currentNode;
          break;
        }
        currentNode = currentNode.next;
      }
      return ret;
    },
    getNodeByIndex(index) {
      let currentNode = startNode;
      for (let i = index; i >= 0; i--) {
        currentNode = currentNode.next;
      }
      return currentNode;
    },
    insertAfter(key, value, anchorNode) {
      // var findedNode = this.getNodeByKey();
      var tempNode = anchorNode.next;
      anchorNode.next = {
        data: {
          key,
          value,
        },
        next: tempNode,
      };
      length++;
    },
    getLength() {
      return length;
    },
    remove(node) {
      const parentNode = this.findParentNode(node);
      parentNode.next = node.next;
      length--;
    },
    findParentNode(node) {
      var currentNode = startNode;

      while (currentNode.next) {
        if (currentNode.next === node) {
          return currentNode;
        }
        currentNode = currentNode.next;
      }
      return null;
    },
  };
}

/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
  this.capacity = capacity;
  this.linkList = getLinkList();
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
  const matchedNode = this.linkList.getNodeByKey(key);
  if (matchedNode) {
    this.linkList.remove(matchedNode);
    this.linkList.insertAfter(
      matchedNode.data.key,
      matchedNode.data.value,
      this.linkList.startNode
    );
  }
  return matchedNode ? matchedNode.data.value : -1;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
  const matchedNode = this.linkList.getNodeByKey(key);
  const isFull = this.linkList.getLength() === this.capacity;
  if (matchedNode) {
    this.linkList.remove(matchedNode);
  } else if (isFull) {
    this.linkList.remove(this.linkList.getNodeByIndex(this.capacity - 1));
  }

  this.linkList.insertAfter(key, value, this.linkList.startNode);
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
