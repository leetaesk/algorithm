/**
 * 우선순위큐 구현 => minQ
 * 가장 낮은 거 2개 뺴서 가장 맵지 않은 음식의 스코빌 지수 + (두 번째로 맵지 않은 음식의 스코빌 지수 * 2)
 * 가장 낮은 게 K 이상이면 count 리턴 => 안되면 -1 리턴
 */
class MinHeap {
    constructor() {
        this.heap = [null];
    }

    push(value) {
        this.heap.push(value);

        let currentIndex = this.heap.length - 1;
        let parentIndex = Math.floor(currentIndex / 2);

        // 부모가 0이 아니고 부모가 나보다 작을 때
        while (parentIndex !== 0 && this.heap[parentIndex] > value) {
            // 구조분해할당으로 바꾸기
            [this.heap[parentIndex], this.heap[currentIndex]] = [
                this.heap[currentIndex],
                this.heap[parentIndex],
            ];
            currentIndex = parentIndex;
            parentIndex = Math.floor(currentIndex / 2);
        }
    }

    pop() {
        // 1. 힙이 비었을 때 (0번 인덱스는 안쓰므로 길이 1이 빈 것)
        if (this.heap.length === 1) return undefined;

        // 2. 요소가 하나뿐일 때 (루트만 있을 때) -> 바로 리턴
        if (this.heap.length === 2) return this.heap.pop();

        const returnValue = this.heap[1];
        // 맨 끝 노드를 루트로 가져옴
        this.heap[1] = this.heap.pop();

        let currentIndex = 1;
        let leftIndex = 2;
        let rightIndex = 3;

        // 왼쪽 자식이 있을 때만 반복 (왼쪽이 없으면 자식이 아예 없는 것)
        while (this.heap[leftIndex] !== undefined) {
            // 비교 대상: 기본은 왼쪽 자식
            let smallerChildIndex = leftIndex;

            // 오른쪽 자식이 있고, 오른쪽이 왼쪽보다 더 작다면? -> 비교 대상은 오른쪽
            if (
                this.heap[rightIndex] !== undefined &&
                this.heap[rightIndex] < this.heap[leftIndex]
            ) {
                smallerChildIndex = rightIndex;
            }

            // 부모(나)가 더 작은 자식보다 크면 스왑 (내려가야 함)
            if (this.heap[currentIndex] > this.heap[smallerChildIndex]) {
                [this.heap[currentIndex], this.heap[smallerChildIndex]] = [
                    this.heap[smallerChildIndex],
                    this.heap[currentIndex],
                ];

                // 인덱스 업데이트
                currentIndex = smallerChildIndex;
                leftIndex = currentIndex * 2;
                rightIndex = currentIndex * 2 + 1;
            } else {
                // 내가 자식들보다 작으면 멈춤 (제자리 찾음)
                break;
            }
        }

        return returnValue;
    }
}

function solution(scoville, K) {
    const heap = new MinHeap();
    scoville.forEach((s) => heap.push(s));

    let count = 0;
    while (heap.heap.length > 1) {
        //가장 맵지 않은 음식이 K 이상이면 성공
        if (heap.heap[1] >= K) {
            return count;
        }

        //남은 음식이 1개뿐이라 더 못 섞음 -> -1
        if (heap.heap.length === 2) {
            return -1;
        }

        // 3. 섞기
        count++;
        const first = heap.pop();
        const second = heap.pop();
        heap.push(first + second * 2);
    }

    // while 끝나버리면 -1 리턴
    return -1;
}

/**
 * 피드백 => size 귀찮아서 뻈는데 length를 쓰면 +1해야 되서 헷갈리는 듯. size 쓰는 게 낫다
 */
class MinHeap {
    constructor() {
        this.heap = [null];
        this.size = 0; // 직관적인 개수 관리를 위한 변수
    }

    push(value) {
        this.heap.push(value);
        this.size++; // 데이터가 추가되었으니 size 증가

        // size가 곧 마지막 요소의 인덱스가 됨 (직관적!)
        let currentIndex = this.size;
        let parentIndex = Math.floor(currentIndex / 2);

        while (parentIndex !== 0 && this.heap[parentIndex] > value) {
            [this.heap[parentIndex], this.heap[currentIndex]] = [
                this.heap[currentIndex],
                this.heap[parentIndex],
            ];
            currentIndex = parentIndex;
            parentIndex = Math.floor(currentIndex / 2);
        }
    }

    pop() {
        // size가 0이면 비어있는 것
        if (this.size === 0) return undefined;

        // size가 1이면 루트만 있는 것
        if (this.size === 1) {
            this.size--;
            return this.heap.pop();
        }

        const returnValue = this.heap[1];

        // 힙의 맨 끝 요소(this.size 위치)를 루트로 이동
        this.heap[1] = this.heap.pop();
        this.size--; // 데이터가 빠졌으니 size 감소

        let currentIndex = 1;
        let leftIndex = 2;
        let rightIndex = 3;

        while (this.heap[leftIndex] !== undefined) {
            // 혹은 leftIndex <= this.size
            let smallerChildIndex = leftIndex;

            if (
                this.heap[rightIndex] !== undefined &&
                this.heap[rightIndex] < this.heap[leftIndex]
            ) {
                smallerChildIndex = rightIndex;
            }

            if (this.heap[currentIndex] > this.heap[smallerChildIndex]) {
                [this.heap[currentIndex], this.heap[smallerChildIndex]] = [
                    this.heap[smallerChildIndex],
                    this.heap[currentIndex],
                ];
                currentIndex = smallerChildIndex;
                leftIndex = currentIndex * 2;
                rightIndex = currentIndex * 2 + 1;
            } else {
                break;
            }
        }

        return returnValue;
    }
}

function solution(scoville, K) {
    const heap = new MinHeap();
    scoville.forEach((s) => heap.push(s));

    let count = 0;

    // 데이터가 있는 동안 반복
    while (heap.size > 0) {
        // 1. [성공] 가장 맵지 않은 음식(루트)이 K 이상이면 성공
        if (heap.heap[1] >= K) {
            return count;
        }

        // 2. [실패] 남은 음식이 2개 미만(1개 이하)이면 섞을 수 없음
        // length === 2 같은 헷갈리는 조건 대신 size < 2 로 명확해짐
        if (heap.size < 2) {
            return -1;
        }

        // 3. 섞기
        count++;
        const first = heap.pop();
        const second = heap.pop();
        heap.push(first + second * 2);
    }

    return -1;
}
