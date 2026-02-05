/**
 * dp의 기본 바이블 ㅋㅋ
 * 각 물건은 W의 무게고 V만큼의 행복을 준다 products: [W, V][]
 * K만큼 담을 수 있는 배낭이 있을 때 total V의 최댓값을 출력하라
 */
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const input = `4 7
2 13
4 8
3 12
5 12`
    .trim()
    .split("\n");

const [N, K] = input[0].split(" ").map(Number);
const products = input.slice(1).map((s) => s.split(" ").map(Number));

// dp[k] = k무게에서 느낄 수 있는 행복의 최댓값
const dp = Array.from({ length: K + 1 }, () => 0);

// 물건 최대 100개
for (let [w, v] of products) {
    // K부터 w까지 역순으로 순회해야 같은 물건을 중복해서 넣지 않음
    for (let i = K; i >= w; i--) {
        // 같은 걸 여러번 넣는 경우가 생기네요.
        dp[i] = Math.max(dp[i], dp[i - w] + v);
    }
}

console.log(dp[K]);
