const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split("\n")

const input = `4 3
1 2 3
2 3 2
2 4 4
1 2
4 1
3 1
`
    .toString()
    .trim()
    .split("\n");

const [N, Q] = input[0].split(" ").map(Number);
const USADO = [];
const questions = [];
for (let i = 1; i < N; i++) {
    USADO.push(input[i].split(" ").map(Number));
}
for (let i = N; i < input.length; i++) {
    questions.push(input[i].split(" ").map(Number));
}
