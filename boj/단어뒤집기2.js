const fs = require("fs");
// const S = fs.readFileSync('/dev/stdin').toString().trim()
const S = `<   space   >space space space<    spa   c e>`;

// 태그는 그대로 냅두고 문자열만 뒤집는다. 단어들은 공백으로 구분. 태그속 공백은 유지할것

let answer = "";

let isInTag = false;
let stack = [];

for (let char of S) {
    // 태그 진행중일떄는 그대로 넣기. continue
    if (isInTag) {
        answer += char;

        // 태그 닫힌 경우
        if (char === ">") {
            isInTag = false;
        }

        continue;
    }

    // 태그를 만났을 때
    if (char === "<") {
        // 스택에 쌓여있는 문자가 있다면 answer에 플러스. <보다 먼저 쌓여야 함
        while (stack.length > 0) {
            answer += stack.pop();
        }

        // 태그 진행 중 표시
        isInTag = true;
        answer += char;

        continue;
    }

    // 공백인 경우. 연속하는 두 단어는 무조건 공백 하나로만 구분함
    if (char === " ") {
        // 스택에 쌓여있는 문자가 있다면 answer에 플러스
        while (stack.length > 0) {
            answer += stack.pop();
        }

        // 공백 넣어줘야 함
        answer += char;

        continue;
    }

    // 문자열인 경우. 숫자인 경우도
    stack.push(char);
}

// 마지막에 끝났을 때도 남아있는 거 넣어주기
// 스택에 쌓여있는 문자가 있다면 answer에 플러스
while (stack.length > 0) {
    answer += stack.pop();
}

// console.log("<   space   >ecaps ecaps ecaps<    spa   c e>");
console.log(answer);
