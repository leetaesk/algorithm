const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = `7
1 2 1 3 1 2 1
4
1 3
2 5
3 3
5 7`
    .toString()
    .trim()
    .split("\n");

// 질문개수M 1,000,000임. N은 2,000이지만 arr의 요소 하나가 100,000이하임. 전부 6자리라고 가정하면 전체자리 12,000. 이미시간초과임.
// 심지어 제한시간 0,5초 ㅋㅋ 질문마다 50돌려야 하는데요? 그렇다면 자료를 하나 미리 만들어놓고 질문마다 꺼내야 함 ㅇㅇ
// 질문마다 뭐 돌리는 게 아님!
// 그럼 dp를 만들어놓고 기록을 해놔라! 이건데... 아니면 그리디임
// dp[s][e]로 메모를 하면...? 그럼 while(s<=e)돌려서 메모도 할 수 있 아니네 ㅅㅂ 자리수가 다를수도.
// 입력값을 input 변수에 배열 형태로 잘 받아왔다고 가정합니다.
const N = Number(input[0]);
// 인덱스 계산을 직관적으로 하기 위해 맨 앞에 임의의 값(0)을 넣어 1번 인덱스부터 시작하게 합니다.
const arr = [0, ...input[1].split(" ").map(Number)];
const M = Number(input[2]);

// dp[i][j]: i번째부터 j번째까지 팰린드롬이면 1, 아니면 0
const dp = Array.from({ length: N + 1 }, () => Array(N + 1).fill(0));

// 1. 길이가 1인 구간 초기화 (무조건 팰린드롬)
for (let i = 1; i <= N; i++) {
    dp[i][i] = 1;
}

// 2. 길이가 2인 구간 초기화 (두 수가 같으면 팰린드롬)
for (let i = 1; i < N; i++) {
    if (arr[i] === arr[i + 1]) {
        dp[i][i + 1] = 1;
    }
}

// 3. 길이가 3 이상인 구간 DP 바텀업 채우기
// 구간의 길이(len)를 3부터 N까지 점차 늘려가며 확인합니다.
for (let len = 3; len <= N; len++) {
    for (let start = 1; start <= N - len + 1; start++) {
        const end = start + len - 1; // 현재 구간의 끝 인덱스

        // 양 끝의 숫자가 같고, 그 안쪽 구간이 팰린드롬이었다면 현재 구간도 팰린드롬!
        if (arr[start] === arr[end] && dp[start + 1][end - 1] === 1) {
            dp[start][end] = 1;
        }
    }
}

const answers = [];
// 3번째 줄부터 M개의 질문이 시작됨
for (let i = 3; i < 3 + M; i++) {
    const [S, E] = input[i].split(" ").map(Number);
    // 미리 계산해둔 DP 배열에서 값을 O(1)로 바로 꺼냄
    answers.push(dp[S][E]);
}

console.log(answers.join("\n"));
