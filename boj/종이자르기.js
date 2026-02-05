const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = `10 8
3
0 3
1 4
0 2`
    .toString()
    .trim()
    .split("\n");

// N이 가로길이, M이 세로길이
const [N, M] = input[0].split(" ").map(Number);
const length = Number(input[1]);
const lines = input.slice(2).map((s) => s.split(" ").map(Number));

const 가로 = Array.from({ length: N + 1 }, () => true);
가로[0] = false;
가로[N] = false;
const 세로 = Array.from({ length: M + 1 }, () => true);
세로[0] = false;
세로[M] = false;

for (let line of lines) {
    // 0이면 가로로 점선 => 세로에 기록
    if (line[0] === 0) {
        세로[line[1]] = false;
    } else {
        가로[line[1]] = false;
    }
}

let max가로 = 0;
for (let i = 0; i <= N; i++) {
    if (가로[i] === true) continue;

    for (let k = i + 1; k <= N; k++) {
        // false(잘라진면)이라면 기록 후 break
        if (가로[k] === false) {
            max가로 = Math.max(max가로, k - i);
            break;
        }
    }
}

let max세로 = 0;
for (let i = 0; i <= M; i++) {
    if (세로[i] === true) continue;

    for (let k = i + 1; k <= M; k++) {
        // false(잘라진면)이라면 기록 후 break
        if (세로[k] === false) {
            max세로 = Math.max(max세로, k - i);
            break;
        }
    }
}

console.log(가로);
console.log(세로);
console.log(max가로);
console.log(max세로);
console.log(max가로 * max세로);
