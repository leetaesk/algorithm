const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const input = `4 2
4 2
3 1`
    .toString()
    .trim()
    .split("\n");

class Heap {
    constructor(compareFn) {
        this.heap = [null]; // 1-based indexing
        this.compare = compareFn || ((a, b) => a - b); // default MinHeap
    }

    get size() {
        return this.heap.length - 1;
    }

    top() {
        return this.size > 0 ? this.heap[1] : null;
    }

    push(value) {
        this.heap.push(value);
        this._bubbleUp();
    }

    pop() {
        if (this.size === 0) return null;
        if (this.size === 1) return this.heap.pop();

        const result = this.heap[1];
        this.heap[1] = this.heap.pop();
        this._bubbleDown();
        return result;
    }

    _bubbleUp() {
        let currentIndex = this.size;
        let parentIndex = Math.floor(currentIndex / 2);

        while (
            currentIndex > 1 &&
            this.compare(this.heap[currentIndex], this.heap[parentIndex]) < 0
        ) {
            [this.heap[currentIndex], this.heap[parentIndex]] = [
                this.heap[parentIndex],
                this.heap[currentIndex],
            ];
            currentIndex = parentIndex;
            parentIndex = Math.floor(currentIndex / 2);
        }
    }

    _bubbleDown() {
        let currentIndex = 1;
        let leftIndex = currentIndex * 2;
        let rightIndex = currentIndex * 2 + 1;

        while (leftIndex <= this.size) {
            let targetIndex = leftIndex;

            if (
                rightIndex <= this.size &&
                this.compare(this.heap[rightIndex], this.heap[leftIndex]) < 0
            ) {
                targetIndex = rightIndex;
            }

            if (
                this.compare(this.heap[currentIndex], this.heap[targetIndex]) <=
                0
            )
                break;

            [this.heap[currentIndex], this.heap[targetIndex]] = [
                this.heap[targetIndex],
                this.heap[currentIndex],
            ];
            currentIndex = targetIndex;
            leftIndex = currentIndex * 2;
            rightIndex = currentIndex * 2 + 1;
        }
    }
}

// 32,000. 100,000
const [N, M] = input[0].split(" ").map(Number);

const degree = Array.from({ length: N + 1 }, () => 0);

const graph = Array.from({ length: N + 1 }, () => []);
for (let i = 1; i < input.length; i++) {
    const [s, e] = input[i].split(" ").map(Number);

    graph[s].push(e);
    degree[e]++;
}

const answers = [];

// 일반 배열 대신 직접 구현하신 힙을 생성합니다.
const minHeap = new Heap();

for (let i = 1; i <= N; i++) {
    // degree가 0이 아니면 continue
    if (degree[i] !== 0) continue;

    // degree가 0인 (선행 조건이 없는) 문제들을 힙에 넣습니다.
    minHeap.push(i);
}

// 위상 정렬 진행
while (minHeap.size > 0) {
    // 최소 힙이므로 항상 남은 것 중 '가장 쉬운 문제(번호가 작은 문제)'가 꺼내집니다.
    const current = minHeap.pop();
    answers.push(current);

    // 현재 문제(current)를 풀었으니, 이 문제에 의존하던 다음 문제들을 확인합니다.
    for (const next of graph[current]) {
        degree[next]--; // 선행 조건을 하나 달성했으므로 차수 감소

        // 앞서 풀어야 할 문제를 모두 풀었다면 힙에 새롭게 추가합니다.
        if (degree[next] === 0) {
            minHeap.push(next);
        }
    }
}

// 정답 출력
console.log(answers.join(" "));
