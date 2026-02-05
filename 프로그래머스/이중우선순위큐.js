/**
 * 이중우선순위큐 => 최소힙과 최대힙을 둘 다 구현후 map을 활용하여 동기화하기.
 */
class Heap {
    constructor(compareFn) {
        this.heap = [];
        this.compare = compareFn;
    }

    push(val) {
        this.heap.push(val);
        this.bubbleUp();
    }

    pop() {
        if (this.heap.length === 0) return null;
        const root = this.heap[0];
        const last = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this.bubbleDown();
        }
        return root;
    }

    peek() {
        return this.heap.length > 0 ? this.heap[0] : null;
    }

    size() {
        return this.heap.length;
    }

    bubbleUp() {
        let idx = this.heap.length - 1;
        while (idx > 0) {
            const pIdx = Math.floor((idx - 1) / 2);
            if (this.compare(this.heap[idx], this.heap[pIdx])) {
                [this.heap[idx], this.heap[pIdx]] = [
                    this.heap[pIdx],
                    this.heap[idx],
                ];
                idx = pIdx;
            } else {
                break;
            }
        }
    }

    bubbleDown() {
        let idx = 0;
        const len = this.heap.length;
        while (idx * 2 + 1 < len) {
            let tIdx = idx * 2 + 1;
            const rIdx = idx * 2 + 2;
            if (rIdx < len && this.compare(this.heap[rIdx], this.heap[tIdx])) {
                tIdx = rIdx;
            }
            if (this.compare(this.heap[tIdx], this.heap[idx])) {
                [this.heap[idx], this.heap[tIdx]] = [
                    this.heap[tIdx],
                    this.heap[idx],
                ];
                idx = tIdx;
            } else {
                break;
            }
        }
    }
}

function solution(operations) {
    const minHeap = new Heap((a, b) => a < b);
    const maxHeap = new Heap((a, b) => a > b);
    const counts = new Map(); // 숫자의 유효 개수 관리

    // 힙의 top이 이미 삭제된(유효하지 않은) 값이라면 제거하는 함수
    const cleanHeap = (heap) => {
        while (heap.size() > 0 && (counts.get(heap.peek()) || 0) === 0) {
            heap.pop();
        }
    };

    operations.forEach((op) => {
        const [cmd, valStr] = op.split(" ");
        const val = Number(valStr);

        if (cmd === "I") {
            minHeap.push(val);
            maxHeap.push(val);
            counts.set(val, (counts.get(val) || 0) + 1);
        } else if (cmd === "D") {
            if (val === 1) {
                // 최댓값 삭제
                cleanHeap(maxHeap);
                if (maxHeap.size() > 0) {
                    const max = maxHeap.pop();
                    counts.set(max, counts.get(max) - 1);
                }
            } else {
                // 최솟값 삭제
                cleanHeap(minHeap);
                if (minHeap.size() > 0) {
                    const min = minHeap.pop();
                    counts.set(min, counts.get(min) - 1);
                }
            }
        }
    });

    // 모든 연산 후 최종 정리
    cleanHeap(maxHeap);
    cleanHeap(minHeap);

    if (maxHeap.size() === 0 || minHeap.size() === 0) {
        return [0, 0];
    }

    return [maxHeap.peek(), minHeap.peek()];
}
