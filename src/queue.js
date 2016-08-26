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
		if(this.size() < this.maxSize) {
			this.heap.push(data, priority);
		}
		else 
			throw new Error("Queue is full!");
	}

	shift() {
		if(this.size() > 0) {
			return this.heap.pop();
		}
		else
			throw new Error("Queue is empty!");
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
