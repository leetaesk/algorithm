/**
 * N은 1000 이하.
 */
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const input = `3
26 40 83
49 60 57
13 89 99`
    .trim()
    .split("\n");

const N = Number(input[0]);
const costs = input.slice(1).map((i) => i.split(" ").map(Number));

const dp = Array.from({ length: N }, () =>
    Array.from({ length: 3 }, () => Infinity),
);

dp[0][0] = costs[0][0];
dp[0][1] = costs[0][1];
dp[0][2] = costs[0][2];

// i는 1, color는 0일 떄
// dp[1][0] = Math.min(costs[1])
for (let i = 1; i < N; i++) {
    for (let color = 0; color < 3; color++) {
        dp[i][color] = Math.min(
            costs[i][color] + dp[i - 1][(color + 2) % 3],
            costs[i][color] + dp[i - 1][(color + 1) % 3],
        );
    }
}

console.log(Math.min(...dp[N - 1]));
