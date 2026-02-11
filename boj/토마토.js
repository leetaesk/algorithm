const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n')
const input = `6 4
0 0 0 0 0 0
0 0 0 0 0 0
0 0 0 0 0 0
0 0 0 0 0 1`
    .toString()
    .trim()
    .split("\n");

const [M, N] = input[0].split(" ").map(Number);
const map = input.slice(1).map((s) => s.split(" ").map(Number));

const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
];
const isIn = (i, j) => i >= 0 && i < N && j >= 0 && j < M;

let 익은토마토 = 0;
let 안익은토마토 = 0;
let queue = [];

for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
        if (map[i][j] === 1) {
            익은토마토++;
            queue.push([i, j]);
        } else if (map[i][j] === 0) {
            안익은토마토++;
        }
    }
}

let answer = -1;
let total = 익은토마토 + 안익은토마토;
if (total === 익은토마토) {
    console.log(0);
    return;
}

let day = 0;

while (queue.length > 0) {
    // 날짜증가
    day++;

    // 오늘의 다음타겟들을 뉴큐에 담음
    let newQueue = [];
    while (queue.length > 0) {
        let [ci, cj] = queue.pop();

        for (let [di, dj] of directions) {
            let [ni, nj] = [ci + di, cj + dj];

            if (
                isIn(ni, nj) === false ||
                map[ni][nj] === 1 ||
                map[ni][nj] === -1
            ) {
                continue;
            }

            map[ni][nj] = 1;
            newQueue.push([ni, nj]);
            익은토마토++;
        }
    }
    // 토마토가 다 익었다면 반복문 끝내기
    if (익은토마토 === total) {
        answer = day;
        break;
    }
    // 큐 갱신.
    queue = newQueue;
}

console.log(answer);
