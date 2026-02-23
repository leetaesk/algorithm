const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = `1 1 1
2 2 2
10 4 6
50 50 50
-1 7 18
-1 -1 -1`
    .toString()
    .trim()
    .split("\n");

const answers = [];

const dp = Array.from({ length: 21 }, () =>
    Array.from({ length: 21 }, () => Array.from({ length: 21 }, () => null)),
);

const w = (a, b, c) => {
    if (a <= 0 || b <= 0 || c <= 0) return 1;
    if (a > 20 || b > 20 || c > 20) return w(20, 20, 20);
    // 메모값이 있으면 최우선 리턴
    if (dp[a][b][c] !== null) return dp[a][b][c];

    // 3. 계산 및 메모 (모든 경로에서 dp에 값을 할당해야 함)
    if (a < b && b < c) {
        dp[a][b][c] = w(a, b, c - 1) + w(a, b - 1, c - 1) - w(a, b - 1, c);
    } else {
        dp[a][b][c] =
            w(a - 1, b, c) +
            w(a - 1, b - 1, c) +
            w(a - 1, b, c - 1) -
            w(a - 1, b - 1, c - 1);
    }

    return dp[a][b][c];
};

for (let i = 0; i < input.length - 1; i++) {
    const [a, b, c] = input[i].split(" ").map(Number);
    const result = w(a, b, c);
    answers.push(`w(${a}, ${b}, ${c}) = ${result}`);
}

console.log(answers.join("\n"));
