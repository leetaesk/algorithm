// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const input = `4 6
1 3 3 10 3 5
8 1 8 7 6 9
10 2 2 3 7 2
6 3 1 2 10 1
2 1 2 4`
    .trim()
    .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const tomato = input.slice(1, N + 1).map((s) => s.split(" ").map(Number));
let wall = input[N + 1].split(" ").map(Number);

let [x, xx] = [wall[0], wall[2]].sort((a, b) => a - b);
let [y, yy] = [wall[1], wall[3]].sort((a, b) => a - b);

// 2배로 부푼 맵을 만듬. 벽과 칸을 구분짓기 위해서임
const map = Array.from({ length: 2 * N + 1 }, () =>
    Array.from({ length: 2 * M + 1 }, () => 0),
);

// 벽에 "벽"이라고 표시 ㅋㅋ
if (x === xx) {
    // 가로 벽인 경우
    for (let i = 2 * y; i <= 2 * yy; i++) {
        map[2 * x][i] = "벽";
    }
} else {
    // 세로 벽인 경우
    for (let i = 2 * x; i <= 2 * xx; i++) {
        map[i][2 * y] = "벽";
    }
}

// 맵의 각 칸에 tomato 표시를 해버리기
for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
        map[2 * i + 1][2 * j + 1] = tomato[i][j];
    }
}

// [수정 1] dp 변수 선언 (let 추가) 및 초기값을 '도달 불가(-Infinity)'로 설정
// 0으로 초기화하면, 합계가 0인 유효한 경로와 도달 불가능한 경로를 구분할 수 없음
let dp = Array.from({ length: 2 * M + 1 }, () => Number.MIN_SAFE_INTEGER);

// 시작점 초기화
dp[1] = tomato[0][0];

for (let i = 1; i < 2 * N; i += 2) {
    for (let j = 1; j < 2 * M; j += 2) {
        if (j === 1 && i === 1) continue;

        // [수정 2] top과 left의 초기값도 도달 불가 상태로 설정
        let top = Number.MIN_SAFE_INTEGER;
        let left = Number.MIN_SAFE_INTEGER;

        // 위쪽에서 오는 길 확인 (벽이 아니고, 위쪽 칸이 도달 가능한 상태여야 함)
        if (i > 1 && map[i - 1][j] !== "벽") {
            top = dp[j]; // 1차원 배열이므로 dp[j]는 갱신 전 값(즉, 바로 위 칸의 값)을 가짐
        }

        // 왼쪽에서 오는 길 확인 (벽이 아니고, 왼쪽 칸이 도달 가능한 상태여야 함)
        if (j > 1 && map[i][j - 1] !== "벽") {
            left = dp[j - 2];
        }

        // [수정 3] 둘 다 도달 불가능하면 현재 칸도 도달 불가 유지, 하나라도 가능하면 큰 값 선택
        if (
            top === Number.MIN_SAFE_INTEGER &&
            left === Number.MIN_SAFE_INTEGER
        ) {
            dp[j] = Number.MIN_SAFE_INTEGER;
        } else {
            dp[j] = Math.max(top, left) + map[i][j];
        }
    }
}

// [수정 4] 결과값이 초기값(도달 불가) 그대로라면 Entity 출력
const result = dp[2 * M - 1];
console.log(result === Number.MIN_SAFE_INTEGER ? "Entity" : result);
