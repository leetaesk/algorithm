// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const input = `7
1
5
2
10
-99
7
5`
    .toString()
    .trim()
    .split("\n");

const N = Number(input[0]);
const commands = input.slice(1).map(Number);

class MinHeap {
    constructor() {
        // 1-based indexing을 위해 null을 미리 넣어둠
        this.heap = [null];
        this.size = 0;
    }

    // 힙의 맨 위에 있는 값 (최솟값) 확인
    top() {
        if (this.size === 0) return null;
        return this.heap[1];
    }

    push(value) {
        this.heap.push(value);
        this.size++;

        let currentIndex = this.size;
        let parentIndex = Math.floor(currentIndex / 2);

        // 1-based indexing이므로 parentIndex !== 0 조건 사용
        while (
            currentIndex > 1 &&
            this.heap[parentIndex] > this.heap[currentIndex]
        ) {
            // Swap
            [this.heap[parentIndex], this.heap[currentIndex]] = [
                this.heap[currentIndex],
                this.heap[parentIndex],
            ];

            // 인덱스 갱신 (위로 타고 올라감)
            currentIndex = parentIndex;
            parentIndex = Math.floor(currentIndex / 2);
        }
    }

    pop() {
        if (this.size === 0) return null;
        if (this.size === 1) {
            this.size--;
            return this.heap.pop();
        }

        // 루트(최솟값)를 임시 저장
        const min = this.heap[1];

        // 맨 끝 노드를 루트로 옮김
        this.heap[1] = this.heap.pop();
        this.size--;

        let currentIndex = 1;
        let leftChild = currentIndex * 2;
        let rightChild = currentIndex * 2 + 1;

        // 자식이 있는 동안 반복 (왼쪽 자식이 없으면 자식이 없는 것)
        while (leftChild <= this.size) {
            let smallerChild = leftChild; // 일단 왼쪽이 더 작다고 가정

            // 오른쪽 자식이 있고, 오른쪽이 왼쪽보다 더 작다면 오른쪽 선택
            if (
                rightChild <= this.size &&
                this.heap[rightChild] < this.heap[leftChild]
            ) {
                smallerChild = rightChild;
            }

            // 부모가 자식보다 작거나 같으면 멈춤 (힙 속성 만족)
            if (this.heap[currentIndex] <= this.heap[smallerChild]) break;

            // Swap
            [this.heap[currentIndex], this.heap[smallerChild]] = [
                this.heap[smallerChild],
                this.heap[currentIndex],
            ];

            // 아래로 내려감
            currentIndex = smallerChild;
            leftChild = currentIndex * 2;
            rightChild = currentIndex * 2 + 1;
        }

        return min;
    }
}

// ----------------------------------------------------
// 로직 시작
// ----------------------------------------------------

// 왼쪽 힙 (최대 힙 역할: 작은 값들의 모임 -> 루트가 중간값)
// -> 값을 넣을 때 -1을 곱해서 MinHeap에 넣으면, 절댓값이 큰 수가 루트가 됨 (즉, 원래 값 기준 최대값)
const maxHeap = new MinHeap();

// 오른쪽 힙 (최소 힙 역할: 큰 값들의 모임)
const minHeap = new MinHeap();

let answer = [];

for (let i = 0; i < N; i++) {
    const num = commands[i];

    // 1. 두 힙의 균형을 맞추며 데이터 삽입
    // maxHeap의 크기는 항상 minHeap과 같거나 1만큼 커야 함
    if (maxHeap.size === minHeap.size) {
        maxHeap.push(-num); // 최대 힙이므로 부호 반전
    } else {
        minHeap.push(num);
    }

    // 2. 정렬 순서가 맞지 않으면 교환 (MaxHeap의 최대값 > MinHeap의 최소값인 경우)
    // maxHeap.top()은 부호가 반전된 상태이므로, 비교 시 -를 붙여 원래 값으로 복원
    if (minHeap.size > 0 && -maxHeap.top() > minHeap.top()) {
        const maxVal = -maxHeap.pop(); // 원래 값 복구
        const minVal = minHeap.pop();

        maxHeap.push(-minVal); // 교환해서 넣기
        minHeap.push(maxVal);
    }

    // 3. 중간값은 항상 maxHeap의 top (홀수일 땐 중앙값, 짝수일 땐 두 수 중 작은 수)
    answer.push(-maxHeap.top());
}

console.log(answer.join("\n"));
