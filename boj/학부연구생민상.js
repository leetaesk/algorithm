const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const input = `8 8
0 0 0 0 0 0 0 0
0 0 0 3 0 0 0 4
0 1 0 0 3 0 0 3
0 0 0 0 0 0 1 0
0 1 0 9 0 0 4 0
0 0 0 0 2 0 0 0
0 0 0 0 0 0 0 0
0 0 0 2 0 0 0 0`
    .toString()
    .trim()
    .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const grid = input.slice(1).map((s) => s.split(" ").map(Number));

// 1. 3차원 방문 배열 생성: visited[r][c][dir]
// 상(0), 우(1), 하(2), 좌(3) 4가지 방향을 저장하기 위해 길이 4짜리 배열을 만듭니다.
const visited = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => Array(4).fill(false)),
);

// 상(0), 우(1), 하(2), 좌(3)
const dr = [-1, 0, 1, 0];
const dc = [0, 1, 0, -1];

const q = [];

// 2. 에어컨(9)을 찾아서 4방향으로 바람 출발시키기
for (let r = 0; r < N; r++) {
    for (let c = 0; c < M; c++) {
        if (grid[r][c] === 9) {
            for (let d = 0; d < 4; d++) {
                q.push([r, c, d]);
                visited[r][c][d] = true; // 출발지 방문 처리
            }
        }
    }
}

// 3. 바람 이동 시뮬레이션 (BFS)
let head = 0; // shift() 대신 인덱스를 사용하여 큐 속도 최적화
while (head < q.length) {
    const [r, c, dir] = q[head++]; // 현재 위치와 바람의 방향

    const nr = r + dr[dir];
    const nc = c + dc[dir];

    // 격자를 벗어나지 않았다면
    if (nr >= 0 && nr < N && nc >= 0 && nc < M) {
        let ndir = dir;
        const cell = grid[nr][nc];

        // 거울을 만났을 때 방향 전환 유틸 로직
        if (cell === 1) {
            // | 거울
            if (dir === 1) ndir = 3;
            else if (dir === 3) ndir = 1;
        } else if (cell === 2) {
            // - 거울
            if (dir === 0) ndir = 2;
            else if (dir === 2) ndir = 0;
        } else if (cell === 3) {
            // / 거울
            if (dir === 0) ndir = 1;
            else if (dir === 1) ndir = 0;
            else if (dir === 2) ndir = 3;
            else if (dir === 3) ndir = 2;
        } else if (cell === 4) {
            // \ 거울
            if (dir === 0) ndir = 3;
            else if (dir === 1) ndir = 2;
            else if (dir === 2) ndir = 1;
            else if (dir === 3) ndir = 0;
        }

        // '다음 칸'에 '변경된 방향'으로 간 적이 없다면 전진!
        // (이 조건이 거울 핑퐁 무한루프를 막아줍니다)
        if (!visited[nr][nc][ndir]) {
            visited[nr][nc][ndir] = true;
            q.push([nr, nc, ndir]);
        }
    }
}

// 4. 정답 카운트
let answer = 0;
for (let r = 0; r < N; r++) {
    for (let c = 0; c < M; c++) {
        // 에어컨이 있던 자리거나, 상하좌우 중 한 방향이라도 바람이 지나간 적이 있다면
        if (
            grid[r][c] === 9 ||
            visited[r][c][0] ||
            visited[r][c][1] ||
            visited[r][c][2] ||
            visited[r][c][3]
        ) {
            answer++;
        }
    }
}

console.log(answer);
