const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const input = `4 6
1 2 3
2 3 3
3 4 1
1 3 5
2 4 5
1 4 4
2 3`
    .toString()
    .trim()
    .split("\n");

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

const [N, E] = input[0].split(" ").map(Number);
const roads = input.slice(1).map((s) => s.split(" ").map(Number));
const [v1, v2] = roads.pop();

const graph = Array.from({ length: N + 1 }, () => []);
for (let [s, v, cost] of roads) {
    graph[s].push([s, v, cost]);
    graph[v].push([v, s, cost]);
}

// 2. 다익스트라 로직을 함수로 분리 (3번 재사용하기 위함)
function getDijkstra(startNode) {
    // 가중치 오름차순 우선순위큐
    const queue = new Heap((a, b) => a[2] - b[2]);

    // 최단 거리 배열 (초기값을 -1 대신 Infinity로 설정)
    const distanceArray = Array.from({ length: N + 1 }, () => Infinity);
    distanceArray[startNode] = 0; // 시작점 거리 0으로 초기화

    // 시작점 큐에 삽입: [이전노드, 현재노드, 누적비용]
    queue.push([startNode, startNode, 0]);

    while (queue.size > 0) {
        const [prev, now, cost] = queue.pop();

        // 큐에서 꺼낸 누적 비용이 이미 기록된 최소 비용보다 크면 무시
        if (distanceArray[now] < cost) continue;

        for (let [s, next, nextCost] of graph[now]) {
            const totalCost = cost + nextCost; // 3. 누적 비용 계산

            // 기존에 기록된 거리보다 새로운 누적 비용이 더 작을 때만 갱신 및 큐에 추가
            if (distanceArray[next] > totalCost) {
                distanceArray[next] = totalCost;
                queue.push([now, next, totalCost]);
            }
        }
    }
    return distanceArray;
}

// 1번 노드, v1 노드, v2 노드에서 각각 출발하는 다익스트라 실행
const distFrom1 = getDijkstra(1);
const distFromV1 = getDijkstra(v1);
const distFromV2 = getDijkstra(v2);

// 1 -> v1 -> v2 -> N
const path1 = distFrom1[v1] + distFromV1[v2] + distFromV2[N];
// 1 -> v2 -> v1 -> N
const path2 = distFrom1[v2] + distFromV2[v1] + distFromV1[N];

// 두 루트 중 최솟값 선택
const answer = Math.min(path1, path2);

if (answer >= Infinity) {
    console.log(-1);
} else {
    console.log(answer);
}
