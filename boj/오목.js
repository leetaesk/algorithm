const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const input = `0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 1 2 0 0 2 2 2 1 0 0 0 0 0 0 0 0 0 0
0 0 1 2 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0
0 0 0 1 2 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 1 2 2 0 0 0 0 0 0 0 0 0 0 0 0
0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 2 1 0 0 0 0 0 0 1 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 2 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0`
    .toString()
    .trim()
    .split("\n");

const map = input.map((s) => s.split(" ").map(Number));

// 6알 연속인 경우에는 세지 않음. ㅇㅇ
const isIn = (i, j) => i >= 0 && i <= 18 && j >= 0 && j <= 18;

// 오른, 아래, 대각밑만 검사
const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
];
const check = (i, j, origin) => {
    //가로검사
    if (j + 4 <= 18) {
        let isRowFive = true;
        for (let k = j + 1; k <= j + 4; k++) {
            // 오리진과 다른것이 나왔을 때
            if (map[i][k] !== origin) {
                isRowFive = false;
                break;
            }
        }
        // 모두 동일할 때는 육목이 아니라면 true 리턴
        if (isRowFive) {
            // 왼쪽꺼보기. 0이라면 바로 true
            if (j + 5 > 18 || map[i][j + 5] !== origin) {
                if (j === 0 || (j > 0 && map[i][j - 1] !== origin)) return true;
            }
        }
    }

    // 세로검사
    if (i + 4 <= 18) {
        let isColFive = true;
        for (let k = i + 1; k <= i + 4; k++) {
            // 오리진과 다른것이 나왔을 때
            if (map[k][j] !== origin) {
                isColFive = false;
                break;
            }
        }
        // 모두 동일할 때는 육목이 아니라면 true 리턴
        if (isColFive) {
            if (i + 5 >= 18 || map[i + 5][j] !== origin) {
                if (i === 0 || (i > 0 && map[i - 1][j] !== origin)) return true;
            }
        }
    }

    // 대각선검사 \이 방향
    if (i + 4 <= 18 && j + 4 <= 18) {
        let is대각선Five = true;
        for (let k = 1; k <= 4; k++) {
            if (map[i + k][j + k] !== origin) {
                is대각선Five = false;
                break;
            }
        }
        // 모두 동일할 때는 육목이 아니라면 true 리턴. 대각선인 경우네는 좀 더 복잡함
        if (is대각선Five) {
            // 우측밑 맨끝 검사
            if (isIn(i + 5, j + 5) === false || map[i + 5][j + 5] !== origin) {
                // 좌측 상단 검사
                if (
                    isIn(i - 1, j - 1) === false ||
                    map[i - 1][j - 1] !== origin
                ) {
                    return true;
                }
            }
        }
    }

    // 대각선검사 / 이 방향
    if (i - 4 >= 0 && j + 4 <= 18) {
        let is대각선오른쪽위Five = true;
        for (let k = 1; k <= 4; k++) {
            if (map[i - k][j + k] !== origin) {
                is대각선오른쪽위Five = false;
                break;
            }
        }
        // 모두 동일할 때는 육목이 아니라면 true 리턴
        // 모두 동일할 때는 육목이 아니라면 true 리턴. 대각선인 경우네는 좀 더 복잡함
        if (is대각선오른쪽위Five) {
            // 우측상단 맨끝 검사
            if (isIn(i - 5, j + 5) === false || map[i - 5][j + 5] !== origin) {
                // 우측 하단 검사
                if (
                    isIn(i + 1, j - 1) === false ||
                    map[i + 1][j - 1] !== origin
                ) {
                    return true;
                }
            }
        }
    }

    return false;
};

let isWinner = 0;
let memo;
for (let i = 0; i <= 18; i++) {
    for (let j = 0; j <= 18; j++) {
        if (map[i][j] !== 0) {
            if (check(i, j, map[i][j])) {
                isWinner = map[i][j];
                memo = `${i + 1} ${j + 1}`;
            }
        }
        if (isWinner) break;
    }
    if (isWinner) break;
}

console.log(isWinner);
if (isWinner !== 0) console.log(memo);
