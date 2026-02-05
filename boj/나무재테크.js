/**
 * 봄 - 나무가 나이만큼 양분을 먹음
 * 여러개라면 어린 나무부터 차례대로 먹음
 * 자신의 나이만큼 양분이 없으면 나무가 죽음
 * 여름 - 죽은 나무가 양분으로 변함 양분 += Math.floor(나이/2)
 * 가을 - 나이가5배수인 나무가 번식 - 주변8칸에 1살나무
 * 겨울 - sd2d2가 양분을 추가
 */
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const input = `5 2 3
2 3 2 3 2
2 3 2 3 2
2 3 2 3 2
2 3 2 3 2
2 3 2 3 2
2 1 3
3 2 3`
    .trim()
    .split("\n");

const [N, M, K] = input[0].split(" ").map(Number);
let robots = input.slice(1, N + 1).map((i) => i.split(" ").map(Number));
// [r,c,age]
// 후에 나이가 어린애부터 먹여야 하니까 뒤에서부터 순회하면 될 듯 ㅇㅇ
let trees = input.slice(N + 1).map((i) => i.split(" ").map(Number));

const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [-1, 1],
    [1, -1],
    [-1, -1],
];

// r,c가 1-based
const map = Array.from({ length: N + 1 }, () =>
    Array.from({ length: N + 1 }, () => ({
        feeds: 5,
        trees: [],
    })),
);

const isIn = (i, j) => i >= 1 && i <= N && j >= 1 && j <= N;

for (let [r, c, age] of trees) {
    map[r][c].trees.push(age);
}

// K년 반복
for (let year = 0; year < K; year++) {
    //봄
    for (let i = 1; i <= N; i++) {
        for (let j = 1; j <= N; j++) {
            // 구조분해할당. 깊은 복사
            let { feeds, trees } = map[i][j];
            // 나무가 있다면
            if (map[i][j].trees.length > 0) {
                // 나이만큼 양분을 먹는데 어린애부터
                let k = trees.length - 1;
                while (k >= 0) {
                    // 먹을수있으면 먹어
                    if (feeds - trees[k] >= 0) {
                        map[i][j].feeds -= trees[k];
                        feeds -= trees[k];
                        // 나이도 먹어
                        map[i][j].trees[k]++;
                        k--;
                    } else {
                        // 먹을 수 없으면 나무 다 죽어버렷! => 음수로 표시
                        for (let deads = k; deads >= 0; deads--) {
                            trees[deads] = -trees[deads];
                        }
                        // 나무 다 죽이고 while문 종료
                        break;
                    }
                }
            }
        }
    }
    //여름 - 죽은 나무가 양분으로 변함
    //가을도 합쳐버리자 - 5의 배수인 나무는 양분뿌리기
    for (let i = 1; i <= N; i++) {
        for (let j = 1; j <= N; j++) {
            // 구조분해할당. 깊은 복사
            let { feeds, trees } = map[i][j];
            if (trees.length > 0) {
                for (let k = 0; k < trees.length; k++) {
                    // 죽었다면, 음수라면
                    if (trees[k] < 0) {
                        map[i][j].feeds += Math.floor(-trees[k] / 2);
                        continue;
                    }

                    // 5의 배수라면 번식 ㄱㄱ
                    if (trees[k] !== 0 && trees[k] % 5 === 0) {
                        for (let [di, dj] of directions) {
                            const [ni, nj] = [i + di, j + dj];
                            if (isIn(ni, nj)) {
                                map[ni][nj].trees.push(1);
                            }
                        }
                    }
                }
                map[i][j].trees = trees.filter((i) => i > 0).map((i) => i);
            }
        }
    }

    //겨울
    for (let i = 1; i <= N; i++) {
        for (let j = 1; j <= N; j++) {
            // robots는 0-based
            map[i][j].feeds += robots[i - 1][j - 1];
        }
    }
}

// 다 끝나고 나무 몇갠지 검사
let answer = 0;
for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= N; j++) {
        answer += map[i][j].trees.length;
    }
}

console.log(answer);
