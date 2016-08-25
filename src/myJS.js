class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if(node != null){
			if(this.left == null){
				this.left = node;
				node.parent = this;
			}
			else{ 
				if (this.right == null){
					this.right = node;
					node.parent = this;
				}
			}
		}
	}

	removeChild(node) {
		if(this.left == node){
			node.parent = null;
			this.left = null;
		}
		else{
			if(this.right == node){
				node.parent = null;
				this.right = null;
			}
			else{
				throw "Not a child";
			}
		}
	}

	remove() {
		if(this.parent != null){
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if(this.parent != null) {
			var parent  = this.parent;
			var leftChild = false;

			if(parent.left == this)
				leftChild = true;

			var secondParentChild;

			if(leftChild)
				secondParentChild = parent.right;
			else
				secondParentChild = parent.left;

            this.remove();       
            
            if(parent.parent != null) {
				var parentOfParent = parent.parent;
				
				var parentLeftChild = false;


				if(parentOfParent.left == parent)
					parentLeftChild = true;

				var secondParentParentChild;

				if(parentLeftChild)
					secondParentParentChild = parentOfParent.right;
				else
					secondParentParentChild = parentOgParent.left;
				

                parent.remove();
              
                secondParentParentChild.remove();
               
	            if(parentLeftChild){
	            	parentOfParent.appendChild(this);
	            	parentOfParent.appendChild(secondParentParentChild);
	            }
	            else{
	            	parentOfParent.appendChild(secondParentParentChild);
	            	parentOfParent.appendChild(this);
	            }
	            
			}

            if(secondParentChild != null){
            	secondParentChild.remove();            	
            }

            var left = this.left;
            var right = this.right;
            if(left != null)
            	left.remove();
            if(right != null)
            	right.remove();

            if(leftChild){
				this.appendChild(parent);
				this.appendChild(secondParentChild);
				if(left != null){
					this.left.appendChild(left);
					if(right != null) 
						this.left.appendChild(right);
				}
			}
			else {
				this.appendChild(secondParentChild);
				this.appendChild(parent);
				if(left != null){
					this.right.appendChild(left);
					if(right != null)
						this.right.appendChild(right);
				}
			}
			
		}
	}
}

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
		console.log("after inserting node {" + node.data +"," + node.priority + "}");	
		console.log(this.root);
		console.log(this.parentNodes);
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
		console.log("Detached root");
		console.log(detached);
		return detached;
	}

	restoreRootFromLastInsertedNode(detached) {
		
		var lastInsertedNode = this.parentNodes.pop();
		lastInsertedNode.remove();
		

		var leftChild = detached.left,
			rightChild = detached.right;

		this.root = lastInsertedNode;

		if(leftChild != null){
			leftChild.remove();
			
		}
		if(rightChild != null){
			rightChild.remove();			
		}

		lastInsertedNode.appendChild(leftChild);
		lastInsertedNode.appendChild(rightChild);

        if(leftChild == null || rightChild == null)
        	this.parentNodes.unshift(this.root);		
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
		console.log("after shiftNodeUp {" + node.data +"," + node.priority + "}");	
		console.log(this.root);
		console.log(this.parentNodes);	
	}

	shiftNodeDown(node) {
		console.log("The start");
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
						console.log("Index:", index);
						if( index > -1) {

							this.parentNodes[index] = node;
						}
					}
				}
				childToSwap.swapWithParent();
				if(this.root == node)
					this.root = childToSwap;
				this.shiftNodeDown(node);
			}
		}
		console.log("after shiftNodeDown {" + node.data +"," + node.priority + "}");	
		console.log(this.root);
		console.log(this.parentNodes);
	}
}