const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const input = `5 5
IEFCJ
FHFKC
FFALF
HFGCF
HMCHH`
    .toString()
    .trim()
    .split("\n");

const [R, C] = input[0].split(" ").map(Number);
const map = input.slice(1);

const set = new Set();
set.add(map[0][0]);

const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [1, 0],
];

const isIn = (i, j) => i >= 0 && i < R && j >= 0 && j < C;

let answer = 1;

const dfs = (i, j, count) => {
    answer = Math.max(answer, count);

    for (let [di, dj] of directions) {
        const [ni, nj] = [i + di, j + dj];

        // 범위 안이고 map 안이라면
        if (isIn(ni, nj) && set.has(map[ni][nj]) === false) {
            set.add(map[ni][nj]);
            dfs(ni, nj, count + 1);
            set.delete(map[ni][nj]);
        }
    }
};

dfs(0, 0, 1);

console.log(answer);
