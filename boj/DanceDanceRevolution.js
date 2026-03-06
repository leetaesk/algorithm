const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim();

const input = `1 2 2 4 0`.toString().trim();

const commands = input.split(" ").map(Number);

let left = 0;
let right = 0;

const calculatePower = (foot, dest) => {
    if (dest === 0) return;

    if (foot === 0) return 2;

    if (foot === dest) return 1;

    if (Math.abs(foot - dest) === 2) return 4;

    return 3;
};

// 2차원 배열 초기화 헬퍼 함수
const createDpTable = () =>
    Array.from({ length: 5 }, () => Array(5).fill(Infinity));

// dp[l][r]: 왼발이 l, 오른발이 r에 있을 때의 최소 비용
let dp = createDpTable();
dp[0][0] = 0; // 초기 상태 (두 발 모두 0에 위치)

for (let i = 0; i < commands.length - 1; i++) {
    const command = commands[i];
    const nextDp = createDpTable(); // 이번 스텝을 밟은 후의 상태를 저장할 새 테이블

    for (let l = 0; l < 5; l++) {
        for (let r = 0; r < 5; r++) {
            // 도달할 수 없는 상태라면 패스
            if (dp[l][r] === Infinity) continue;

            // 두 발이 같은 지점에 있는 것은 허락하지 않음 (단, 시작점 0은 제외)
            // 사실 최소 비용 로직상 자연스레 걸러지지만, 명시적으로 방지해주는 것이 좋습니다.
            if (command === r && l !== 0) {
                // 목표 지점에 이미 오른발이 있는데 왼발을 또 움직일 필요는 없음
            } else {
                // 1. 왼발을 command으로 움직이는 경우
                nextDp[command][r] = Math.min(
                    nextDp[command][r],
                    dp[l][r] + calculatePower(l, command),
                );
            }

            if (command === l && r !== 0) {
                // 목표 지점에 이미 왼발이 있는데 오른발을 또 움직일 필요는 없음
            } else {
                // 2. 오른발을 command으로 움직이는 경우
                nextDp[l][command] = Math.min(
                    nextDp[l][command],
                    dp[l][r] + calculatePower(r, command),
                );
            }
        }
    }

    // 다음 스텝을 위해 dp 테이블 갱신
    dp = nextDp;
}

// 모든 스텝을 마친 후 가장 작은 비용 찾기
let answer = Infinity;
for (let l = 0; l < 5; l++) {
    for (let r = 0; r < 5; r++) {
        answer = Math.min(answer, dp[l][r]);
    }
}

console.log(answer);
