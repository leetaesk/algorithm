const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = `6
1 2 3 4 5 6
2 1 1 1`
    .toString()
    .trim()
    .split("\n");

// N은 11이하. BigInt걱정없고, 연산자의 개수가 정해져잇음.
const N = Number(input[0]);
const arr = input[1].split(" ").map(Number);
// 이거 직접조작 할 거임
let count연산자 = input[2].split(" ").map(Number);

// dp로 하고 싶었으나 연산자의 개수가 정해져있어서 그거를 카운트할 수 없음.
// dfs방식의 완전탐색으로 진행 => 4의 11승.

let min = Infinity;
let max = -Infinity;

const dfs = (nowIdx, value) => {
    if (nowIdx === N - 1) {
        min = Math.min(min, value);
        max = Math.max(max, value);
        return;
    }

    for (let i = 0; i <= 3; i++) {
        let 연산자남은개수 = count연산자[i];

        if (연산자남은개수 === 0) continue;

        // 연산자가 남아있다면
        count연산자[i]--;
        if (i === 0) {
            dfs(nowIdx + 1, value + arr[nowIdx + 1]);
        } else if (i === 1) {
            dfs(nowIdx + 1, value - arr[nowIdx + 1]);
        } else if (i === 2) {
            dfs(nowIdx + 1, value * arr[nowIdx + 1]);
        } else if (i === 3) {
            // Math.truc를 사용해야 소수점 이하를 버린다. Math.floor 혹은 ceil은 테케에서 못 잡을 확률이 높으니 무조건 의심하기
            dfs(nowIdx + 1, Math.trunc(value / arr[nowIdx + 1]));
        }
        count연산자[i]++;
    }
};

dfs(0, arr[0]);

console.log(max);
console.log(min);
