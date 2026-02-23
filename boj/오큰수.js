const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = `4
9 5 4 8 100 3 4 7 5 10 78 10`
    .toString()
    .trim()
    .split("\n");

const N = Number(input[0]);
const arr = input[1].split(" ").map(Number);

// answers는 마지막에 reverse()후 리턴
const answers = [];
// 편의상 무한을 넣어줌
const stack = [Infinity];

// 뒤에서부터 탐색
for (let i = arr.length - 1; i >= 0; i--) {
    const current = arr[i];

    // stack에서 나보다 작은 건 다 지움. 같은 것도 지워야 하는 듯 => 왜???? => 같은수가 오큰수가 되는구나 ㅋㅋ ㅅㅂ
    while (stack[stack.length - 1] < current) {
        stack.pop();
    }

    // answer에 값을 넣어주고 stack에 push
    if (stack[stack.length - 1] === Infinity) {
        answers.push(-1);
    } else {
        answers.push(stack[stack.length - 1]);
    }
    stack.push(current);
}

console.log(answers.reverse().join(" "));
