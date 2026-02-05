// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const input = `6
0 0 0 0 0 0
0 1 0 0 0 0
0 0 0 0 0 0
0 0 0 0 0 0
0 0 0 0 0 0
0 0 0 0 0 0`
    .toString()
    .trim()
    .split("\n");

const N = Number(input[0]);
const map = input.slice(1).map((s) => s.split(" ").map(Number));

//최단거리가 아님. 방법의 개수임. dp로 가야 할까? dfs?는 절대 안 된다.
// DP가 맞다.
let dp = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => Array.from({ length: 3 }, () => 0)),
);
// [가로,세로,대각선] 으로 올 수 있는 개수.
dp[0][1][0] = 1;

for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
        // 현재가 벽이라면 패스
        if (map[i][j] === 1) continue;

        // 가로
        // 가로=>가로
        if (j - 2 >= 0) dp[i][j][0] += dp[i][j - 1][0];
        // 대각선=>가로
        if (i - 1 >= 0 && j - 2 >= 0) dp[i][j][0] += dp[i][j - 1][2];
        // 세로
        // 세로=>세로
        if (i - 2 >= 0) dp[i][j][1] += dp[i - 1][j][1];
        // 대각선=>세로
        if (i - 2 >= 0 && j - 1 >= 0) dp[i][j][1] += dp[i - 1][j][2];
        // 대각선. 대각선의 경우는 윗칸과 왼쪽칸이 벽이 아니여야 카운트
        // Gaurd Close형식으로
        if (map[i - 1]?.[j] === 1 || map[i]?.[j - 1] === 1) continue;
        // 가로 => 대각선
        if (i - 1 >= 0 && j - 2 >= 0) dp[i][j][2] += dp[i - 1][j - 1][0];
        // 세로 => 대각선
        if (i - 2 >= 0 && j - 1 >= 0) dp[i][j][2] += dp[i - 1][j - 1][1];
        // 대각선 => 대각선
        if (i - 2 >= 0 && j - 2 >= 0) dp[i][j][2] += dp[i - 1][j - 1][2];
    }
}

console.log(dp[N - 1][N - 1].reduce((acc, cur) => acc + cur, 0));
