const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = `6 5 2
1 0 1 0 1
0 1 0 1 0
1 1 0 0 0
0 0 0 1 1
1 1 0 1 1
0 0 1 0 0`
    .toString()
    .trim()
    .split("\n");

const [N, M, D] = input[0].split(" ").map(Number);
const map = input.slice(1).map((s) => s.split(" ").map(Number));

let answer = 0;

const getCombination = (arr, selectNum) => {
    const results = [];
    if (selectNum === 1) return arr.map((el) => [el]);
    arr.forEach((fixed, index, origin) => {
        const rest = origin.slice(index + 1);
        const combinations = getCombination(rest, selectNum - 1);
        const attached = combinations.map((comb) => [fixed, ...comb]);
        results.push(...attached);
    });
    return results;
};

const combinations = getCombination(
    Array.from({ length: M }, (_, i) => i),
    3,
);

// BFS 탐색 순서: 왼쪽 -> 위 -> 오른쪽 (거리 같을 때 왼쪽 우선)
const directions = [
    [0, -1],
    [-1, 0],
    [0, 1],
];
const isIn = (i, j) => i >= 0 && i < N && j >= 0 && j < M;

for (let comb of combinations) {
    // [수정 1] 2차원 배열 깊은 복사 (Deep Copy)
    let copyMap = map.map((row) => [...row]);
    let countShoot = 0;

    // 적이 맵에 남아있는지 확인하는 함수
    const hasEnemy = () => copyMap.some((row) => row.includes(1));

    while (hasEnemy()) {
        const 처치한적위치 = new Set();

        for (let 궁수j of comb) {
            const queue = [];
            // [N, 궁수j]에서 시작, 거리는 0
            queue.push([N, 궁수j, 0]);

            const visited = Array.from({ length: N + 1 }, () =>
                Array(M).fill(false),
            ); // N행(성벽)까지 고려

            let targetFound = false;

            while (queue.length > 0) {
                let [i, j, dist] = queue.shift();

                // 현재 위치 탐색 (처음 시작점은 성벽이므로 제외해야 함. dist > 0 일때만 적 체크)
                // 하지만 작성하신 로직은 큐에서 꺼내서 4방향을 보므로, 아래 로직 유지

                for (let [di, dj] of directions) {
                    let [ni, nj] = [i + di, j + dj];

                    // 맵 범위 체크 (성벽 위치인 N행은 갈 필요 없음)
                    if (ni < 0 || ni >= N || nj < 0 || nj >= M) continue;
                    if (visited[ni][nj]) continue;

                    // [수정 2] 거리 제한 D로 변경
                    if (dist + 1 > D) continue;

                    // 적 발견
                    if (copyMap[ni][nj] === 1) {
                        처치한적위치.add(`${ni} ${nj}`);
                        targetFound = true;
                        break; // 가장 가깝고 왼쪽인 적 하나 잡으면 이 궁수는 턴 종료
                    }

                    visited[ni][nj] = true;
                    queue.push([ni, nj, dist + 1]);
                }
                if (targetFound) break;
            }
        }

        // [수정 3] Set 순회 문법 수정
        for (let val of 처치한적위치) {
            const [i, j] = val.split(" ").map(Number);
            if (copyMap[i][j] === 1) {
                // 이미 0이 되었을 수도 있으므로(중복 타겟) 체크
                copyMap[i][j] = 0;
                countShoot++;
            }
        }

        // 적 아래로 이동 (맨 윗줄에 0 추가, 맨 아랫줄 삭제)
        copyMap.pop();
        copyMap.unshift(new Array(M).fill(0));
    }
    answer = Math.max(answer, countShoot);
}

console.log(answer);
