const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = `12 2
3 5
1 1`
    .toString()
    .trim()
    .split("\n");

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
