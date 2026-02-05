// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const input = `3 4
1 2 3 4
0 0 0 5
9 8 7 6`
    .toString()
    .trim()
    .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const map = input.slice(1).map((s) => s.split(" ").map(Number));

const dp = Array.from({ length: N }, () => Array.from({ length: M }, () => 0));

dp[0][0] = map[0][0];

for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
        if (i === 0 && j === 0) continue;

        let top = dp[i - 1]?.[j] || 0;
        let left = dp[i]?.[j - 1] || 0;
        let leftTop = dp[i - 1]?.[j - 1] || 0;
        dp[i][j] = Math.max(top, left, leftTop) + map[i][j];
    }
}

console.log(dp[N - 1][M - 1]);
