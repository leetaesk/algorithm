const fs = require("fs");
// const map = fs.readFileSync("/dev/stdin").toString().trim().split("\n").map((s) => s.split(" ").map(Number));
const map = `0 3 5 4 6 9 2 7 8
7 8 2 1 0 5 6 0 9
0 6 0 2 7 8 1 3 5
3 2 1 0 4 6 8 9 7
8 0 4 9 1 3 5 0 6
5 9 6 8 2 0 4 1 3
9 1 7 6 5 2 0 8 0
6 0 3 7 0 1 9 5 2
2 5 8 3 9 4 7 6 0`
    .toString()
    .trim()
    .split("\n")
    .map((s) => s.split(" ").map(Number));

const N = map.length;

const blanks = [];

// 1. 빈칸(0)의 좌표를 모두 찾아서 배열에 모아둡니다.
for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
        if (map[i][j] === 0) blanks.push([i, j]);
    }
}

const getRange = (num) => {
    return Math.floor(num / 3) * 3;
};

// 2. 해당 위치에 특정 숫자가 들어갈 수 있는지 검사하는 함수
const isCan = (i, j, value) => {
    // 가로세로한번에
    for (let k = 0; k < N; k++) {
        if (map[i][k] === value || map[k][j] === value) return false;
    }

    // 같은 칸0~2면 0. 3~5면 3. 6~8이면 6.
    let si = getRange(i);
    let sj = getRange(j);
    for (let ni = si; ni <= si + 2; ni++) {
        for (let nj = sj; nj <= sj + 2; nj++) {
            if (map[ni][nj] === value) {
                return false;
            }
        }
    }

    // 통과했으면 true 리턴
    return true;
};

// 3. 백트래킹 (DFS)
let isFound = false;
const dfs = (depth) => {
    if (isFound) return;

    if (depth === blanks.length) {
        console.log(map.map((s) => s.join(" ")).join("\n"));
        isFound = true;
        return;
    }

    const [row, col] = blanks[depth];

    for (let i = 1; i <= 9; i++) {
        if (isCan(row, col, i)) {
            map[row][col] = i;

            dfs(depth + 1);

            if (!isFound) {
                map[row][col] = 0;
            }
        }
    }
};

dfs(0);
