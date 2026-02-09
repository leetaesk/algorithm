const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const input = `........
........
........
........
........
........
........
........`
    .toString()
    .trim()
    .split("\n");

const map = input.map((s) => s.trim().split(""));

let isAnswer = 1;

const directions = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
    [0, -1],
    [-1, 0],
    [-1, -1],
    [-1, 1],
    [1, -1],
];

const isIn = (i, j) => i >= 0 && i < 8 && j >= 0 && j < 8;

let queue = [[7, 0]];

// 8일동안 시뮬레이션 => 살아있으면 굿
for (let day = 0; day < 8; day++) {
    // 이동가능한 자리들을 큐에 담음
    let newLocs = new Set(); //큐에 담을 것들. set으로 중복제거
    // for (let [ci, cj] of queue) {
    while (queue.length > 0) {
        let [ci, cj] = queue.pop();

        for (let [di, dj] of directions) {
            let [ni, nj] = [ci + di, cj + dj];
            if (isIn(ni, nj) && map[ni][nj] === ".") {
                newLocs.add(`${ni} ${nj}`);
            }
        }
    }

    // 벽들을 밑으로 내려서 죽은 자리 필터링
    let newStoneLocs = [];
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (map[i][j] === "#") {
                map[i][j] = ".";
                // 마지막줄이라면 넣지 않아도 됨
                if (i < 7) newStoneLocs.push([i + 1, j]);
            }
        }
    }
    for (let [i, j] of newStoneLocs) {
        map[i][j] = "#";
    }
    // 살아있는 자리가 없으면 반복문 끝내고 false
    queue = []; //queue 비우기
    for (let [i, j] of [...newLocs.keys()].map((s) =>
        s.split(" ").map(Number),
    )) {
        // 안 죽었으면 queue 에 담기
        if (map[i][j] === ".") queue.push([i, j]);
    }
    // 살아있는 애 있으면 계속 진행
    if (queue.length === 0) {
        isAnswer = 0;
        break;
    }
}

console.log(isAnswer ? 1 : 0);
