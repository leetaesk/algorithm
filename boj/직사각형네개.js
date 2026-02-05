const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = `1 2 4 4
2 3 5 7
3 1 6 5
7 3 8 6`
    .toString()
    .trim()
    .split("\n");

const rectangles = input.map((s) => s.split(" ").map(Number));

//2배 늘리긴 해야 되네요
const map = Array.from({ length: 201 }, () =>
    Array.from({ length: 201 }, () => 0),
);

for (let [i, j, ii, jj] of rectangles) {
    for (let r = i * 2; r <= ii * 2; r++) {
        for (let c = j * 2; c <= jj * 2; c++) {
            map[r][c] = 1;
        }
    }
}

let answer = 0;

const isFilled = (i, j) =>
    map[i][j] === 1 &&
    map[i + 1][j] === 1 &&
    map[i][j + 1] === 1 &&
    map[i + 1][j + 1] === 1;

for (let i = 0; i < 200; i++) {
    for (let j = 0; j < 200; j++) {
        if (isFilled(i, j)) answer++;
    }
}

// 절반이 아니라 4분의 1임에 주의!!!!
console.log(answer / 4);
