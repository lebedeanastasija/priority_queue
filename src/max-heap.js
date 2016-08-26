const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
	}

	insertNode(node) {
		if(node.priority != undefined) {
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
			this.shiftNodeDown(this.root);
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
		if(this.isEmpty() == false){
			var lastInsertedNode = this.parentNodes.pop();
			lastInsertedNode.remove();
			

			var leftChild = detached.left,
				rightChild = detached.right;

			this.root = lastInsertedNode;

			if(leftChild != null) {
				leftChild.remove();				
			}
			if(rightChild != null){
				rightChild.remove();			
			}

			lastInsertedNode.appendChild(leftChild);
			lastInsertedNode.appendChild(rightChild);

		    if(leftChild == null || rightChild == null) {
		    	this.parentNodes.unshift(this.root);	
		    }
		}
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
				if(node.parent.right == null) {
					this.parentNodes.pop();
					this.parentNodes.push(node.parent);
					this.parentNodes.shift();
					this.parentNodes.unshift(node);
				}
				else {
					var index = this.parentNodes.indexOf(node);
					if (index > -1) {
						this.parentNodes[index] = node.parent;
					}
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
		if(node != null) {
			if (node.right == null){
				if(node.left != null && (node.left.priority > node.priority)) {
					if(node == this.root)
						this.root = node.left;

					this.parentNodes.shift();
					this.parentNodes.unshift(node.left);
					this.parentNodes.pop();
					this.parentNodes.push(node);	

					if(node.left != null)		
						node.left.swapWithParent();
					
					this.shiftNodeDown(node);
				}
			}
			else{
				var child;
				if(node.left.priority >= node.right.priority) {
					if(node.left.priority > node.priority) {
						child = node.left;
					}
				}
				else{
					if(node.right.priority > node.priority) {
						child = node.right;
					}
				}
				var index = this.parentNodes.indexOf(child);
				if(index > -1) {
					this.parentNodes[index] = node;
				}
				if(child != null)
					child.swapWithParent();
				if(node == this.root)
					this.root = child;
				this.shiftNodeDown(node);
			}
		}
	}
}

module.exports = MaxHeap;
