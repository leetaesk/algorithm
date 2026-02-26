const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = `5
1 1 0 1 1
0 1 0 0 0
1 0 1 0 1
1 0 0 0 0
1 0 1 1 1`
    .toString()
    .trim()
    .split("\n");

const N = Number(input[0]);
const map = input.slice(1).map((s) => s.split(" ").map(Number));

// 흑과 백의 최댓값을 각각 따로 저장
let blackAnswer = 0;
let whiteAnswer = 0;

// 시간단축을 위해 놓을 수 있는 곳을 흑/백으로 나누어 메모
const blackLocations = [];
const whiteLocations = [];

for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
        if (map[i][j] === 1) {
            // 행과 열의 합이 짝수면 흑색 칸, 홀수면 백색 칸으로 분리
            if ((i + j) % 2 === 0) {
                blackLocations.push([i, j]);
            } else {
                whiteLocations.push([i, j]);
            }
        }
    }
}

// 현재자리에 놓을 수 있는지 검사하는 유틸 (기존 코드 완벽하게 동일)
const isIn = (i, j) => i >= 0 && i < N && j >= 0 && j < N;
const directions = [
    [1, 1],
    [-1, 1],
    [1, -1],
    [-1, -1],
];
const isValid = (i, j) => {
    for (let dist = 1; dist < N; dist++) {
        for (let [di, dj] of directions) {
            let [ni, nj] = [i + di * dist, j + dj * dist];

            if (isIn(ni, nj) === false) continue;

            // 비숍은 2로 표시
            if (map[ni][nj] === 2) {
                return false;
            }
        }
    }

    return true;
};

// targetLocations(흑 또는 백 배열)을 순회하면서 놓기
const dfs = (idx, count, targetLocations, isBlack) => {
    // 흑/백 여부에 따라 각각의 최댓값 갱신
    if (isBlack) {
        blackAnswer = Math.max(blackAnswer, count);
    } else {
        whiteAnswer = Math.max(whiteAnswer, count);
    }

    for (let i = idx; i < targetLocations.length; i++) {
        let [ni, nj] = targetLocations[i];
        if (isValid(ni, nj)) {
            map[ni][nj] = 2;
            dfs(i + 1, count + 1, targetLocations, isBlack);
            map[ni][nj] = 1; // 롤백
        }
    }
};

// 1. 흑색 칸 탐색 (isBlack = true)
dfs(0, 0, blackLocations, true);

// 2. 백색 칸 탐색 (isBlack = false)
dfs(0, 0, whiteLocations, false);

// 흑색 칸의 최댓값과 백색 칸의 최댓값을 더해서 출력
console.log(blackAnswer + whiteAnswer);
