const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = `12ab112ab2ab
12ab`
    .toString()
    .trim()
    .split("\n");

// str최대 백만
let str = input[0];
const boomStr = input[1].split("").reverse().join("");

// 단순히 폭발마다 str을 순회하면 제곱시가닝라 시간초과난다.
// stack이네 ㅇㅇ

const stack = [];

for (let i = 0; i < str.length; i++) {
    stack.push(str[i]);

    let memoStr = "";
    for (
        let k = stack.length - 1;
        k >= Math.max(0, stack.length - boomStr.length);
        k--
    ) {
        memoStr += stack[k];
    }

    while (memoStr === boomStr) {
        // length 조작으로 boomStr을 없애버릴 수 있음. 위험한 방법이지만 걍 써
        stack.length = stack.length - boomStr.length;
        memoStr.length = "";
        // 새로운 스택에서 memoStr 갱신
        for (
            let k = stack.length - 1;
            k >= stack.length - boomStr.length;
            k--
        ) {
            memoStr += stack[k];
        }
    }
}

console.log(stack.length === 0 ? "FRULA" : stack.join(""));
