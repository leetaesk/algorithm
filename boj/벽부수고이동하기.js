const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = `6 4
0100
1110
1000
0000
0111
0000`
    .toString()
    .trim()
    .split("\n");

class Queue {
    constructor() {
        this.heap = [];
        this.head = 0;
    }

    push(value) {
        this.heap.push(value);
    }

    pop() {
        return this.heap[this.head++];
    }

    get size() {
        return this.heap.length - this.head;
    }
}

const [N, M] = input[0].split(" ").map(Number);
if (N === 0 && M === 0) {
    console.log(1);
    return;
}
const map = input.slice(1).map((s) => s.split("").map(Number));

// 1. 3차원 방문 배열 초기화
// visited[i][j][0] : 벽을 부수지 않고 (i, j)에 방문했는지 여부
// visited[i][j][1] : 벽을 부수고 (i, j)에 방문했는지 여부
const visited = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => [false, false]),
);
const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
];
const isIn = (i, j) => i >= 0 && i < N && j >= 0 && j < M;

// let queue = [[0, 0, 1, false]];
let queue = new Queue();
queue.push([0, 0, 1, 0]); // false 대신 0으로 변경
visited[0][0][0] = true;

let answer = -1;
while (queue.size > 0) {
    let [ci, cj, dist, broken] = queue.pop();

    if (ci === N - 1 && cj === M - 1) {
        answer = dist;
        break;
    }

    for (let [di, dj] of directions) {
        let [ni, nj] = [ci + di, cj + dj];

        // 맵 범위를 벗어나면 패스
        if (isIn(ni, nj) === false) continue;

        // 경우 1: 다음 칸이 빈 칸(0)일 때
        // 현재 상태(broken) 그대로 이동하며, 해당 상태로 방문한 적이 없어야 함
        if (map[ni][nj] === 0 && visited[ni][nj][broken] === false) {
            visited[ni][nj][broken] = true; // 큐에 넣기 전 방문 처리
            queue.push([ni, nj, dist + 1, broken]);
        }

        // 경우 2: 다음 칸이 벽(1)일 때
        // 아직 벽을 부순 적이 없고(broken === 0), 벽을 부순 상태로 해당 칸을 방문한 적이 없어야 함
        else if (
            map[ni][nj] === 1 &&
            broken === 0 &&
            visited[ni][nj][1] === false
        ) {
            visited[ni][nj][1] = true; // 벽을 부순 상태(1)로 방문 처리
            queue.push([ni, nj, dist + 1, 1]); // broken 상태를 1로 변경하여 큐에 삽입
        }
    }
}

console.log(answer);
