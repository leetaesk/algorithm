class Heap {
    constructor(compareFn) {
        this.heap = [null];
        this.compare = compareFn || ((a, b) => a - b);
    }

    get size() {
        return this.heap.length - 1;
    }

    push(value) {
        this.heap.push(value);
        this._bubbleUp();
    }

    pop() {
        if (this.size === 0) return;
        if (this.size === 1) return this.heap.pop();

        const returnValue = this.heap[1];
        this.heap[1] = this.heap.pop();
        this._bubbleDown();
        return returnValue;
    }

    _bubbleUp() {
        let current = this.size;
        let parent = Math.floor(current / 2);

        while (
            current > 1 &&
            this.compare(this.heap[current], this.heap[parent]) < 0
        ) {
            [this.heap[current], this.heap[parent]] = [
                this.heap[parent],
                this.heap[current],
            ];

            current = parent;
            parent = Math.floor(current / 2);
        }
    }

    _bubbleDown() {
        let current = 1;
        let left = 2;
        let right = 3;

        while (left <= this.size) {
            let target = left;

            if (
                right <= this.size &&
                this.compare(this.heap[right], this.heap[left]) < 0
            )
                target = right;

            if (this.compare(this.heap[current], this.heap[target]) <= 0) break;

            [this.heap[current], this.heap[target]] = [
                this.heap[target],
                this.heap[current],
            ];

            current = target;
            left = current * 2;
            right = current * 2 + 1;
        }
    }
}

// 유니온파인드

// find: 부모를 찾아주는 함수.
// 노드의 부모가 노드임 => 노드리턴
// 아니면 => 부모를 부모의노드를찾으며 경로압축
const find = (node) => {
    if (node === parent[node]) return node;
    return (parent[node] = find(parent[node]));
};

// 유니온함수
// 같은 사이클이면 false를 리턴하고
// 아니면 합친다
const union = (a, b) => {
    const root1 = parent[a];
    const root2 = parent[b];

    if (root1 === root2) return false;

    parent[root2] = root1;
    return true;
};
