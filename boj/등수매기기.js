const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = `5
1
5
3
1
2`
    .toString()
    .trim()
    .split("\n");

const N = Number(input[0]);
const 예상등수 = input.slice(1).map((s, idx) => [idx + 1, s]);
