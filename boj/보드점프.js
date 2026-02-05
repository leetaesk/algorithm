/**
 * [BigInt(Big Integer) 사용법]
 * 1. JavaScript의 Number 타입($2^{53}-1$) 한계를 넘는 큰 정수를 다룰 때 사용합니다.
 * 2. 초기화 및 연산 시 숫자 뒤에 'n'을 붙여야 합니다. (예: 0 -> 0n, 1 -> 1n)
 * 3. Number 타입과 직접 연산이 불가능하므로, 모든 피연산자를 BigInt로 맞춰야 합니다.
 * 4. 출력 시 console.log(변수)를 하면 '123n' 형태로 출력되므로,
 * 반드시 .toString()을 붙여 'n'을 제거해야 정답 처리됩니다.
 */

// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const input = `4
2 3 3 1
1 2 1 3
1 2 3 1
3 1 1 0`
    .trim()
    .split("\n");

const N = Number(input[0]);
const map = input.slice(1).map((s) => s.split(" ").map(Number));

const dp = Array.from({ length: N }, () => Array.from({ length: N }, () => 0n));

dp[0][0] = 1n;

const isIn = (i) => i >= 0 && i < N;

for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
        const jump = map[i][j];
        if (map[i][j] === 0n || jump === 0) continue;

        let bottom = i + jump;
        let right = j + jump;
        if (isIn(bottom)) dp[bottom][j] += dp[i][j];
        if (isIn(right)) dp[i][right] += dp[i][j];
    }
}

console.log(dp[N - 1][N - 1].toString());
