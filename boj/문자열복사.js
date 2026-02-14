const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = `xy0z
zzz0yyy0xxx`
    .trim()
    .split("\n");

let S = input[0];
let P = input[1];

// copy함수는 그냥 교란용임. 결국엔 S의 부분문자열을 최소로해서 P를 만들라는 문제. 최소횟수를 구해라~ 이 얘기
let answer = 0;
let memo = 0;

while (memo < P.length) {
    for (let i = P.length - 1; i >= memo; i--) {
        let now = P.slice(memo, i + 1);

        // 만들 수 있으면
        if (S.includes(now)) {
            answer++;
            memo = i + 1;
            break;
        }
    }
}

console.log(answer);
