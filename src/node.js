class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
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
            this.remove();
            var secondParentChild =  parent.rigth;

            if(secondParentChild != null){
            	secondParentChild.remove();
            	this.appendChild(secondParentChild)
            }

            if(parent.parent != null) {
				var parentOfParent = parent.parent;
                parent.remove();
                parentOfParent.appendChild(this);
			}
			this.appendChild(parent);
		}
	}
}

module.exports = Node;
