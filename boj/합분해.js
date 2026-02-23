const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = `20 2`.toString().trim();

const [N, K] = input.split(" ").map(Number);

const 십억 = 1000000000;

// 정수K개를 더해서 N을 만든다.
// dp[i] === N을 i번 더해서 만들 수 있는 경우의 수. 이게 맞는 거 같은데. dp[k] 리턴.
const dp = Array.from({ length: K + 1 }, () => 0);
