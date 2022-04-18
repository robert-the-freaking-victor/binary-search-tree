class Node {
	Left;
	Right;
	CurrentValue;
	LeftDepth;
	RightDepth;

	constructor(currentValue) {
		this.CurrentValue = currentValue;
		this.Left = null;
		this.Right = null;
	}

	add(element) {
		if (element > this.CurrentValue) {
			if (!this.Right) {
				this.Right = new Node(element);
				this.RightDepth++;
			} else {
				this.Right.add(element);
			}
		} else if (element < this.CurrentValue) {
			if (!this.Left) {
				this.Left = new Node(element);
				this.LeftDepth++;
			} else {
				this.Left.add(element);
			}
		}
	}

	find(element) {
		const left = this.Left ? true : false;
		const right = this.Right ? true : false;
		if (element === this.CurrentValue) {
			return this.CurrentValue;
		} else if (!left && !right) {
			throw new Error(`Cant find element ${element}.`);
		} else if (right && element > this.CurrentValue) {
			return this.Right.find(element);
		} else if (left && element < this.CurrentValue) {
			return this.Left.find(element);
		}
	}

	delete(element) {
		if (element === this.CurrentValue) {
			if (this.Left && this.Right) {

			} else if (this.Left) {
				this.copyNode(this.Left);
			} else if (this.Right) {
				this.copyNode(this.Right);
			} else {
				this.clearNode();
			}
		} else if (element > this.CurrentValue) {
			this.Right.delete(element);
		} else if (element < this.CurrentValue) {
			this.Left.delete(element);
		}
	}

	copyNode(element) {
		this.CurrentValue = element.CurrentValue;
		this.Left = element.Left;
		this.Right = element.Right;
	}

	clearNode() {
		this.Left = null;
		this.Right = null;
		this.CurrentValue = null;
	}

	preOrderSearch() {
		console.log(this.CurrentValue);
		if (this.Left) {
			this.Left.preOrderSearch();
		}
		if (this.Right) {
			this.Right.preOrderSearch();
		}
	}

	inOrderSearch() {
		if (this.Left) {
			this.Left.inOrderSearch();
		}
		console.log(this.CurrentValue);
		if (this.Right) {
			this.Right.inOrderSearch();
		}
	}

	postOrderSearch() {
		if (this.Left) {
			this.Left.preOrderSearch();
		}
		if (this.Right) {
			this.Right.preOrderSearch();
		}
		console.log(this.CurrentValue);
	}

	sortTreeWithNode(node) {
		const left = node.Left ? true : false;
		const right = node.Right ? true : false;
		if (!node.CurrentValue) {
			if ((left && right) || right) {
				node.CurrentValue = node.Right.CurrentValue;
				node.Right.CurrentValue = null;
				this.sortTreeWithNode(node.Right);
			} else if (left) {
				node.CurrentValue = node.Left.CurrentValue;
				node.Left.CurrentValue = null;
				this.sortTreeWithNode(node.Left);
			}
		} else {
			this.sortTreeWithNode(node.Left);
			this.sortTreeWithNode(node.Right);
		}
	}
}

module.exports = Node;