// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const input = `8
71 39 44
32 83 55
51 37 63
89 29 100
83 58 11
65 13 15
47 25 29
60 66 19`
    .toString()
    .trim()
    .split("\n");

const N = Number(input[0]);
const costs = input.slice(1).map((s) => s.split(" ").map(Number));

const dp = Array.from({ length: N }, () => Array.from({ length: 3 }, () => 0));

// 1번집을 빨간색으로 칠한 경우
dp[0] = [costs[0][0], 2000000, 2000000];
for (let i = 1; i < N; i++) {
    for (let j = 0; j <= 2; j++) {
        const otherOne = (j + 1) % 3;
        const otherTwo = (j + 2) % 3;
        dp[i][j] =
            Math.min(dp[i - 1][otherOne], dp[i - 1][otherTwo]) + costs[i][j];
    }
}

let firstCase = Math.min(dp[N - 1][1], dp[N - 1][2]);

// 1번집을 파랑색으로 칠한 경우
dp[0] = [2000000, costs[0][1], 2000000];
for (let i = 1; i < N; i++) {
    for (let j = 0; j <= 2; j++) {
        const otherOne = (j + 1) % 3;
        const otherTwo = (j + 2) % 3;
        dp[i][j] =
            Math.min(dp[i - 1][otherOne], dp[i - 1][otherTwo]) + costs[i][j];
    }
}

let secondCase = Math.min(dp[N - 1][0], dp[N - 1][2]);

// 1번집을 초록색으로 칠한 경우
dp[0] = [2000000, 2000000, costs[0][2]];
for (let i = 1; i < N; i++) {
    for (let j = 0; j <= 2; j++) {
        const otherOne = (j + 1) % 3;
        const otherTwo = (j + 2) % 3;
        dp[i][j] =
            Math.min(dp[i - 1][otherOne], dp[i - 1][otherTwo]) + costs[i][j];
    }
}

let thirdCase = Math.min(dp[N - 1][0], dp[N - 1][1]);

console.log(Math.min(firstCase, secondCase, thirdCase));
