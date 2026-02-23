const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = `5
6 9 5 7 4`
    .toString()
    .trim()
    .split("\n");

const N = Number(input[0]);
const tops = input[1].split(" ").map(Number);

// 핵심 로직: 나보다 높은 게 나오면 나한테 올 일은 없다. 이래도 최악의 경우 시간초과... 가 안나온다.
// 이 케이스를 벗어나는 최악의 경우? 모르겠다. 일단 렛츠고
const answers = [];
// 편의성을 위해 0을 넣어둔다. 메모리걱정되니까 문자열로 ㄱ 0에선 무조건 부딪히게 십억을 넣어둠
let stack = [`1000000000 0`];

for (let i = 0; i < tops.length; i++) {
    const currentNumber = i + 1;
    const currentHeight = tops[i];

    // 0번째까지 탐색
    for (let j = stack.length - 1; j >= 0; j--) {
        const [beforeHeight, beforeNumber] = stack[j].split(" ").map(Number);

        // 부딪힘
        if (beforeHeight >= currentHeight) {
            answers.push(beforeNumber);
            break;
        }
        // 안 부딫힘 => stack에서 빼야 함. 얘한테 부딪힐 일은 없기 때문
        else {
            stack.pop();
        }
    }

    // stack에 넣기
    stack.push(`${currentHeight} ${currentNumber}`);
}

console.log(answers.join(" "));
