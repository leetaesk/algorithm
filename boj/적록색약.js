// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const input = `5
RRRBB
GGBBB
BBBRR
BBRRR
RRRRR`
    .trim()
    .split("\n");

const N = Number(input[0]);
const map = input.slice(1);

// const isIn = (i, j) => i >= 0 && j >= 0 && i < N && j < N;

let visited = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => false),
);

const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
];

// 섬을 체크해주고 visited처리까지
const isIsland = (i, j, color, color2) => {
    const queue = [];
    queue.push([i, j]);
    visited[i][j] = true;

    while (queue.length > 0) {
        const [x, y] = queue.shift();
        for (let [di, dj] of directions) {
            const [ni, nj] = [x + di, y + dj];

            // 1. 범위 체크 (옵셔널 체이닝으로 해결) 및 방문 체크
            // visited가 false가 아니면(true거나 undefined면) 건너뜀
            if (visited[ni]?.[nj] !== false) continue;

            // 2. 현재 탐색할 곳의 색깔
            const targetColor = map[ni]?.[nj];

            // 3. 색깔 매칭 로직 (color2가 있으면 둘 다 체크)
            let isMatch = false;
            if (color2) {
                // 적록색약 등 두 가지 색을 같은 구역으로 볼 때
                isMatch = targetColor === color || targetColor === color2;
            } else {
                // 일반적인 경우
                isMatch = targetColor === color;
            }

            if (isMatch) {
                visited[ni][nj] = true;
                queue.push([ni, nj]);
            }
        }
    }

    return 1;
};

let countR = 0;
let countG = 0;
let countB = 0;

for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
        if (visited[i][j] === false) {
            let now = map[i][j];
            isIsland(i, j, now);
            if (now === "R") countR++;
            if (now === "G") countG++;
            if (now === "B") countB++;
        }
    }
}

// visited 초기화
visited = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => false),
);

let countRG = 0;
for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
        if (visited[i][j] === false && map[i][j] !== "B") {
            isIsland(i, j, "R", "G");
            countRG++;
        }
    }
}

console.log(`${countB + countG + countR} ${countB + countRG}`);
