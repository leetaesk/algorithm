const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = `5
2 5
3 8
1 10
7 14
2 5`
    .toString()
    .trim()
    .split("\n");

const N = Number(input[0]);
const arr = input.slice(1).map((s) => s.split(" ").map(Number));

const dp = Array.from({ length: N }, () => Array(2).fill(0));
dp[0][0] = arr[0][0];
dp[0][1] = arr[0][1];

for (let i = 1; i < N; i++) {
    dp[i][0] =
        arr[i][0] +
        Math.max(
            dp[i - 1][0] + Math.abs(arr[i - 1][1] - arr[i][1]),
            dp[i - 1][1] + Math.abs(arr[i - 1][0] - arr[i][1]),
        );

    dp[i][1] =
        arr[i][1] +
        Math.max(
            dp[i - 1][0] + Math.abs(arr[i - 1][1] - arr[i][0]),
            dp[i - 1][1] + Math.abs(arr[i - 1][0] - arr[i][0]),
        );
}

console.log(Math.max(dp[N - 1][0], dp[N - 1][1]));
