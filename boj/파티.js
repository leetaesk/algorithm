const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const input = `4 8 2
1 2 4
1 3 2
1 4 7
2 1 1
2 3 5
3 1 2
3 4 4
4 2 3`
    .toString()
    .trim()
    .split("\n");

const [N, M, X] = input[0].split(" ").map(Number);
const roads = input.slice(1).map((s) => s.split(" ").map(Number));

// 각자의 집에서 X마을로 가는 시간 => 방향을 역으로 바꿔서 다익스트라 적용
// 각자 X마을에서 집으로 가는 시간 => 그냥 다익스트라 적용. ㅇㅋㅇㅋ

class Heap {
    constructor(compareFn) {
        this.heap = [null];
        this.compare = compareFn || ((a, b) => a - b);
    }

    get size() {
        return this.heap.length - 1;
    }

    clear() {
        this.heap.length = 1;
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

            if (this.compare(this.heap[current], this.heap[target]) < 0) break;

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

const graph = Array.from({ length: N + 1 }, () => []);
const reversedGraph = Array.from({ length: N + 1 }, () => []);
for (let [s, e, cost] of roads) {
    graph[s].push([e, cost]);
    reversedGraph[e].push([s, cost]);
}

const getDijkstra = (startNode, isReverse) => {
    const nowGraph = isReverse ? graph : reversedGraph;

    // compareFn 까먹음 ㅋㅋ;; 뭐임
    const queue = new Heap((a, b) => a[1] - b[1]);

    const distance = Array.from({ length: N + 1 }, () => Infinity);
    distance[startNode] = 0;

    queue.push([startNode, 0]);

    while (queue.size > 0) {
        const [now, nowCost] = queue.pop();

        // continue로직 여기에 추가
        if (distance[now] < nowCost) continue;

        for (let [next, nextCost] of nowGraph[now]) {
            const totalCost = nowCost + nextCost;

            if (distance[next] < totalCost) continue;

            distance[next] = totalCost;
            queue.push([next, totalCost]);
        }
    }

    return distance;
};

const distanceToX = getDijkstra(X, true);
const distanceToHome = getDijkstra(X, false);

let max = -Infinity;

for (let i = 1; i <= N; i++) {
    max = Math.max(max, distanceToHome[i] + distanceToX[i]);
}

console.log(max);
