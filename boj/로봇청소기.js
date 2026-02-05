/**
 * 구현
 */
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const input = `11 10
7 4 0
1 1 1 1 1 1 1 1 1 1
1 0 0 0 0 0 0 0 0 1
1 0 0 0 1 1 1 1 0 1
1 0 0 1 1 0 0 0 0 1
1 0 1 1 0 0 0 0 0 1
1 0 0 0 0 0 0 0 0 1
1 0 0 0 0 0 0 1 0 1
1 0 0 0 0 0 1 1 0 1
1 0 0 0 0 0 1 1 0 1
1 0 0 0 0 0 0 0 0 1
1 1 1 1 1 1 1 1 1 1`
    .trim()
    .split("\n");

const [N, M] = input[0].split(" ").map(Number);
let [r, c, d] = input[1].split(" ").map(Number);

// 0인 경우 청소되지 않은 빈칸
// 1인 경우 벽
const map = input.slice(2).map((s) => s.split(" ").map(Number));

// 0부터 북동남서
// 방향 돌릴떄는 반시계임 => -1
const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
];

// 범위 안인지 검사 유틸
const isIn = (i, j) => i >= 0 && i < N && j >= 0 && j < M;

let count = 0;

while (true) {
    // 지금 있는 칸
    let now = map[r][c];

    // 1. 현재 칸이 0이면 청소
    if (now === 0) {
        count++;
        map[r][c] = "clean";
    }

    // 주변칸에 빈칸이 있는지 검사로직
    let hasDirty = false;
    for (let [di, dj] of directions) {
        let [ni, nj] = [r + di, c + dj];
        if (isIn(ni, nj) && map[ni][nj] === 0) {
            hasDirty = true;
            break;
        }
    }

    // 2. 청소되지 않은 빈칸이 없는 경우
    // 뒤는 현재방향+2을 4로 나눈 나머지 => 0이면2, 1이면3, 2면0, 3이면1
    if (hasDirty === false) {
        const back = (d + 2) % 4;
        // 뒤로갈수있다면 한칸 후진하고 1번으로
        const [di, dj] = directions[back];
        const [ni, nj] = [r + di, c + dj];
        // 벽이 아닐 때 => 청소된 칸이라도 갈 수 있다면 감
        if (isIn(ni, nj) && map[ni][nj] !== 1) {
            [r, c] = [ni, nj];
            continue;
        } else {
            // 뒤에가 벽이라면 while문 종료
            break;
        }
    }

    // 3. 청소되지 않은 빈칸이 있을 때
    // 반시계방향으로 회전 => 0이라면 3, 1이라면 0, 2라면 1, 3이라면 2
    d = (d + 3) % 4;
    // 앞칸이 청소되지않은 빈칸(0)일 때 전진
    const [di, dj] = directions[d];
    const [ni, nj] = [r + di, c + dj];
    if (isIn(ni, nj) && map[ni][nj] === 0) {
        [r, c] = [ni, nj];
    }
}

console.log(count);
