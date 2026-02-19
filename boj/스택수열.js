const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = `8
4
3
6
8
7
5
2
1`
    .toString()
    .trim()
    .split("\n");

const N = Number(input[0]);
const 수열 = input.slice(1).map(Number);

let idx = 0;
const stack = [];
let is불가능 = false;
const answer = [];

let now = 1;
while (now <= N) {
    // stack에 넣기
    stack.push(now);
    answer.push("+");

    // 스택에서 빼야 한다면 빼기
    while (stack.length > 0 && stack[stack.length - 1] === 수열[idx]) {
        stack.pop();
        answer.push("-");
        idx++;
    }

    // 탈출조건. 마지막에 있는게 다음에 넣을 숫자보다 작다? 이미 못꺼냄.
    // stack마지막에 7이 있는데 3을 넣어야 함. 3을 못넣으므로 못만듬
    if (stack.length > 0 && stack[stack.length - 1] > 수열[idx + 1]) {
        is불가능 = true;
        break;
    }

    now++;
}

console.log(is불가능 ? "NO" : answer.join("\n"));
