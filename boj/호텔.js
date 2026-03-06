const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = `100 6
4 9
9 11
3 4
8 7
1 2
9 8`
    .toString()
    .trim()
    .split("\n");

// 목표고객 C 1000. N 20
const [C, N] = input[0].split(" ").map(Number);
const costs = input.slice(1).map((s) => s.split(" ").map(Number));

let maxPeople = costs.reduce((acc, cur) => Math.max(acc, cur[1]), 0);

// dp[i] = i명유치하는데 드는 비용의 최솟값
// Infinity로 초기화
// 적어도 C명이기 때문에 여유롭게 해야 함 ㅇㅇ
const dp = Array.from({ length: C + maxPeople }, () => Infinity);

dp[0] = 0;

for (let i = 0; i < dp.length; i++) {
    for (let [cost, people] of costs) {
        if (i + people < dp.length) {
            dp[i + people] = Math.min(dp[i] + cost, dp[i + people]);
        }
    }
}

console.log(dp.slice(C).reduce((acc, cur) => Math.min(acc, cur), Infinity));

/**
 * 기존코드
 * const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

// 목표고객 C 1000. N 20
const [C, N] = input[0].split(" ").map(Number);
const costs = input.slice(1).map((s) => s.split(" ").map(Number));

// dp 같습니다.
// dp[i] = i명의 고객을 얻는데 쓴 돈의 최솟값
// C에 딱 안 맞아 떨어질 수 있음. cost의 최댓값이 100이니 최대dp값을 C+101로 하드코딩
const dp = Array.from({ length: C + 101 }, () => Infinity);
dp[0] = 0;

for (let [cost, user] of costs) {
    for (let i = user; i < dp.length; i++) {
        dp[i] = Math.min(dp[i], dp[i - user] + cost);
    }
}

console.log(dp.slice(C).reduce((acc, cur) => Math.min(acc, cur)));

 */
