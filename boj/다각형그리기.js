const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const input = `10
1 4 1 1 4 3 3 3 2 2
3
3 2 2 1 4 1 1 4 3 3
1 4 4 3 3 3 2 1 1 2
4 4 1 1 1 2 3 3 2 3`
    .toString()
    .trim()
    .split("\n");

const leng = Number(input[0]);
const reference = input[1].split(" ").map(Number);
const N = Number(input[2]);
const arr = input.slice(3).map((s) => s.split(" ").map(Number));

let count = 0;
let memo = [];

// 모양수열길이 최대 50. 101칸으로 설정하고 50에서 시작 ㄱㄱ
const map = Array.from({ length: 101 }, () =>
    Array.from({ length: 101 }, () => false),
);

// 오위왼밑
const directions = {
    1: [0, 1],
    2: [-1, 0],
    3: [0, -1],
    4: [1, 0],
};

let [i, j] = [50, 50];
// 맨 마지막에 체크하겠지만 그냥 미리 체크
map[i][j] = true;
for (let command of reference) {
    let [di, dj] = directions[command];
    let [ni, nj] = [i + di, j + dj];
    [i, j] = [ni, nj];
    map[ni][nj] = true;
}

for (let rec of arr) {
    let [ci, cj] = [50, 50];
    let isSame = true;
    for (let command of rec) {
        // 이동
        let [di, dj] = directions[command];
        let [ni, nj] = [ci + di, cj + dj];
        [ci, cj] = [ni, nj];
        // 이동한 곳이 경로 위인지 검사
        if (map[ci][cj] === false) {
            isSame = false;
            break;
        }
    }
    if (isSame) {
        count++;
        memo.push(rec);
    }
}

console.log(count);
if (memo.length > 0) {
    console.log(memo.map((m) => m.join(" ")).join("\n"));
}
