const fs = require("fs");
// const map = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const map = `0 3 5 4 6 9 2 7 8
7 8 2 1 0 5 6 0 9
0 6 0 2 7 8 1 3 5
3 2 1 0 4 6 8 9 7
8 0 4 9 1 3 5 0 6
5 9 6 8 2 0 4 1 3
9 1 7 6 5 2 0 8 0
6 0 3 7 0 1 9 5 2
2 5 8 3 9 4 7 6 0`
    .toString()
    .trim()
    .split("\n")
    .map((s) => s.split(" ").map(Number));

const blanks = [];

// 1. 빈칸(0)의 좌표를 모두 찾아서 배열에 모아둡니다.
for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
        if (map[i][j] === 0) {
            blanks.push([i, j]);
        }
    }
}

// 2. 해당 위치에 특정 숫자가 들어갈 수 있는지 검사하는 함수
function isValid(row, col, value) {
    // 가로, 세로 검사를 한 번의 반복문으로 처리
    for (let i = 0; i < 9; i++) {
        if (map[row][i] === value) return false;
        if (map[i][col] === value) return false;
    }

    // 3x3 박스 검사
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (map[startRow + i][startCol + j] === value) return false;
        }
    }

    return true;
}

// 3. 백트래킹 (DFS)
let isFound = false; // 정답을 찾았는지 확인하는 플래그

function dfs(depth) {
    // 이미 정답을 찾아서 출력까지 마쳤다면 남은 재귀는 빠르게 종료
    if (isFound) return;

    // 기저 조건: 모아둔 빈칸을 끝까지 다 채웠을 때
    if (depth === blanks.length) {
        // 완성된 보드를 문자열로 만들어서 출력! (백준 국룰)
        console.log(map.map((row) => row.join(" ")).join("\n"));
        isFound = true; // 정답 찾음 표시
        return;
    }

    const [row, col] = blanks[depth];

    for (let i = 1; i <= 9; i++) {
        if (isValid(row, col, i)) {
            map[row][col] = i;
            dfs(depth + 1);

            // ★ 다음 단계에서 정답을 못 찾고 돌아왔을 때만 롤백 ★
            // (정답을 이미 찾았다면 롤백하지 않고 그대로 둡니다)
            if (!isFound) {
                map[row][col] = 0;
            }
        }
    }
}

dfs(0);
