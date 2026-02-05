// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const input = `4
1 5 6 7`
    .toString()
    .trim()
    .split("\n");

const N = Number(input[0]);
const costs = input[1].split(" ").map(Number);

// N개의 카드를 샀을 때 금액의 최대값 구하기
// 1-based dp배열. costs는 idx+1이 카드개수임에 주의
const dp = Array.from({ length: N + 1 }, () => 0);

// 카드를 순회? 한 카드를 여러번 살 수 있음
for (let i = 0; i < costs.length; i++) {
    let 카드팩가격 = costs[i];
    let 카드팩에들어있는카드수 = i + 1;

    if (카드팩에들어있는카드수 > N) break;

    // 카드팩에들어있는카드수부터 순회
    // 이 경우에 같은 카드를 여러번 사는 경우까지 카운트 가능
    for (let idx = 카드팩에들어있는카드수; idx <= N; idx++) {
        dp[idx] = Math.max(
            dp[idx],
            dp[idx - 카드팩에들어있는카드수] + 카드팩가격,
        );
    }
}

console.log(dp[N]);
