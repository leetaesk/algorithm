const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n')

const input = `5
4
1 3 1 2
3
1 3 2`
    .toString()
    .trim()
    .split("\n");

const T = Number(input[0]);
const N = Number(input[1]);
const A = input[2].split(" ").map(Number);
const M = Number(input[3]);
const B = input[4].split(" ").map(Number);

// T는 절댓값 10억 이하. A와 B의 원소는 절댓값 백만 이하고 길이는 1000임. 중복가능.
// 순서는 보장되어야 함
// 슬라이딩 윈도우를 2중으로 하기? => 경우의 수가 항상 2개씩.. 왼쪽을 늘리던가 오른쪽을 늘리던가...
// 아무래도 dp같음!
// B의 모든합을 set에 넣어놓고 A를 2중순회하며 B에 들어있는 확인한다면? => 몇개가 들어있는지 모르지 않는가? => 그럼 map 으로? => 객체로 어떰 => 가져오기가 힘들지 않나

// B의 모든 합의 경우를 기록할 맵. value는 경우의 수임
const memoB = new Map();

for (let i = 0; i < M; i++) {
    let sum = B[i];
    memoB.set(sum, (memoB.get(sum) || 0) + 1);
    for (let j = i + 1; j < M; j++) {
        sum += B[j];
        memoB.set(sum, (memoB.get(sum) || 0) + 1);
    }
}

// 이제 A에서 똑ㄱ같이 ㄱㄱ
let answer = 0;
for (let i = 0; i < N; i++) {
    let sum = A[i];
    if (memoB.has(T - sum)) {
        answer += memoB.get(T - sum);
    }
    for (let j = i + 1; j < N; j++) {
        sum += A[j];
        if (memoB.has(T - sum)) {
            answer += memoB.get(T - sum);
        }
    }
}

console.log(answer);
