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
                parent.remove();
                parentOfParent.appendChild(this);
			}

            if(secondParentChild != null){
            	secondParentChild.remove();            	
            }

            if(leftChild){
				this.appendChild(parent);
				this.appendChild(secondParentChild);
			}
			else {
				this.appendChild(secondParentChild);
				this.appendChild(parent);
			}
		}
	}
}

module.exports = Node;
