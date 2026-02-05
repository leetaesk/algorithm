/**
 * N은 2이상 200이하
 * 200명중 한 명을 201개의 자리 중 하나로 옮김 => 40200
 * 그때마다 200개의 순서를 검증 40200*200 =>
 * 그거를 200번 반복 => 시간초과. 검증을 배열순회가 아닌 다른 방식으로 해야 할 듯??
 */
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const input = `7
3
7
5
2
6
1
4`
    .trim()
    .split("\n")
    .map(Number);

const N = input[0];
const students = input.slice(1);
/**
 * 시뮬레이션이 아니었음. 최장증가부분수열 을 구한다!!
 * 학생이 나란히 서있을 때 '각 학생마다 자기 앞에 잘 서 있는 개수'를 구한다 (최장증가부분수열)
 * 이 가장 긴 수열을 기준으로 엇나가있는 놈들만 잘 바꾸면 할 수 있음.
 * 문제에서는 3,5,6 => 3이고
 * N - 최장부분수열 이라 답이 4임 ㄷㄷ
 */
// dp[i] : i번째 학생을 마지막으로 하는 LIS(최장 증가 부분 수열)의 길이
// 초기값은 자기 자신만 포함하므로 모두 1로 설정
const dp = new Array(N).fill(1);

// LIS 알고리즘 (O(N^2))
for (let i = 0; i < N; i++) {
    for (let j = 0; j < i; j++) {
        // 내 앞(j)에 있는 학생이 나(i)보다 번호가 작다면,
        // 그 학생 뒤에 서는 것이 가능하므로 길이를 갱신
        if (students[j] < students[i]) {
            // 원래값과
            // j학생의 LIS + 1
            // 중 더 큰 것.
            dp[i] = Math.max(dp[i], dp[j] + 1);
        }
    }
}

// 가장 긴 증가하는 부분 수열의 길이
const maxLIS = Math.max(...dp);

// 전체 학생 수 - 옮기지 않아도 되는 학생 수(LIS) = 최소 이동 횟수
console.log(N - maxLIS);
