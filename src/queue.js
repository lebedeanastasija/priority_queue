const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		if(maxSize === undefined) 
			this.maxSize = 30;
		else
			this.maxSize = maxSize;
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		if(this.maxSize > this.size()) {
			this.heap.push(data, priority);
		}
		else 
			throw "Queue is full";
	}

	shift() {
		if(this.size() > 0) {
			return this.heap.pop();
		}
		else
			throw "Queue is empty";
	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		if(this.size() == 0)
			return true;
		else
			return false;
	}
}

module.exports = PriorityQueue;
