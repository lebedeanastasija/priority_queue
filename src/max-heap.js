const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
	}

	insertNode(node) {
		if(this.isEmpty() == true) {
			this.root = node;
			this.parentNodes.push(node);
		}
		else {
			var parentToAppend = this.parentNodes[0];
			parentToAppend.appendChild(node);

			if(parentToAppend.right != null) {
				this.parentNodes.shift();
			}				
			this.parentNodes.push(node);
		}
	}

	push(data, priority) {
		var newNode = new Node(data, priority);
		this.insertNode(newNode);
		this.shiftNodeUp(newNode);
	}

	pop() {
		if(this.isEmpty() == false) {
			var data = this.root.data;
			var detached = this.detachRoot();
			this.restoreRootFromLastInsertedNode(detached);
			return data;
		}
	}

	detachRoot() {
		var detached = this.root;
		this.root = null;

		if(this.parentNodes[0] == detached) {
			this.parentNodes.shift();
		}
		return detached;
	}

	restoreRootFromLastInsertedNode(detached) {
		var lastInsertedNode = this.parentNodes[this.size() - 1];
		lastInsertedNode.remove();
		this.parentNodes.pop();

		var leftChild = detached.left,
			rightChild = detached.right;

		if(leftChild != null){
			leftChild.remove();
			lastInsertedNode.appendChild(leftChild);
		}
		if(rightChild != null){
			rightChild.remove();
			lastInsertedNode.appendChild(rightChild);
		}
        if(leftChild == null || rightChild == null)
        	this.parentNodes.unshift(lastInsertedNode);

		this.root = lastInsertedNode;
	}

	size() {
		return this.parentNodes.length;
	}

	isEmpty() {
		if(this.size() == 0)
			return true;
		else
			return false;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
	}

	shiftNodeUp(node) {
		if(node.parent != null) {
			if(node.priority > node.parent.priority) {
				if(this.parentNodes[0] == node.parent) {
					this.parentNodes[0] = node;
					this.parentNodes[this.size() - 1] = node.parent;
				}
				else {
					this.parentNodes[0] = node.parent;
				}
				node.swapWithParent();
				this.shiftNodeUp(node);
			}
		}
		else {
			this.root = node;
		}
	}

	shiftNodeDown(node) {
		var left = node.left,
			right = node.rigth;

		if(left != null || right != null) {			
			var childToSwap;

			if(left != null && right != null)
				(left.priority > right.priority) ? childToSwap = left : childToSwap = right;
			else 
				childToSwap = left;			    

			if(node.priority < childToSwap.priority) {
				if((childToSwap == left) && (right == null)) {
					this.parentNodes.shift();
					this.parentNodes.unshift(childToSwap);
					this.push(node);
				}
				else {
					if((childToSwap == left) && (right != null)) {
						var index = this.parentNodes.indexOf(childToSwap);
						if( index != -1) {
							this.parentNodes[index] = node;
						}
					}
				}
				childToSwap.swapWithParent();
				this.shiftNodeDown(node);
			}
		}
	}
}

module.exports = MaxHeap;
