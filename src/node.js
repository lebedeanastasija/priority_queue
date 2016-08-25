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
				this.left.appendChild(left);
				this.left.appendChild(right);
			}
			else {
				this.appendChild(secondParentChild);
				this.appendChild(parent);
				this.right.appendChild(left);
				this.right.appendChild(right);
			}
		}
	}
}

module.exports = Node;
