const fs = require("fs");
// const N = Number(fs.readFileSync('/dev/stdin').toString().trim().split('\n'))

const N = 8;

const map = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => false),
);

const directions = [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
];
const isIn = (i, j) => i >= 0 && i < N && j >= 0 && j < N;

const isValid = (i, j) => {
    // 직선검사
    for (let k = 0; k < N; k++) {
        // 사실 같은 행 (가로) 는 볼 필요가 없음... 과감하게 패스
        if (map[k][j] === true || map[i][k] === true) return false;
    }

    // 대각선검사
    for (let k = 1; k < N; k++) {
        for (let [di, dj] of directions) {
            let [ci, cj] = [i + di * k, j + dj * k];
            if (isIn(ci, cj) === false) continue;

            if (map[ci][cj] === true) return false;
        }
    }

    return true;
};

let answer = 0;

const dfs = (depth) => {
    if (depth === N) {
        answer++;
        return;
    }

    // 여기 올 가능성 없으나 안전성을 위하여
    if (depth > N) return;

    for (let j = 0; j < N; j++) {
        if (isValid(depth, j)) {
            map[depth][j] = true;
            dfs(depth + 1);
            map[depth][j] = false;
        }
    }
};

dfs(0);

console.log(answer);
