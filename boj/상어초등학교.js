/**
 * 비어있는 칸 중에서 좋아하는 학생이 인접한 칸에 가장 많은 칸으로 자리를 정한다.
 * 1을 만족하는 칸이 여러 개이면, 인접한 칸 중에서 비어있는 칸이 가장 많은 칸으로 자리를 정한다.
 * 2를 만족하는 칸도 여러 개인 경우에는 행의 번호가 가장 작은 칸으로, 그러한 칸도 여러 개이면 열의 번호가 가장 작은 칸으로 자리를 정한다.
 * 3 ≤ N ≤ 20
 * 완전탐색 400
 */
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const input = `3
4 2 5 1 7
3 1 9 4 5
9 8 1 2 3
8 1 9 3 4
7 2 3 4 8
1 9 2 5 7
6 5 2 3 4
5 1 9 2 8
2 9 3 1 4`
    .trim()
    .split("\n");

const N = Number(input[0]);
const likesInfo = input.slice(1).map((i) => i.split(" ").map(Number));

const map = Array.from({ length: N }, () => Array.from({ length: N }, () => 0));

const isIn = (i, j) => i >= 0 && i < N && j >= 0 && j < N;

const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
];

const inspect = (i, j, likes) => {
    let vacant = 0;
    let likesCount = 0;
    for (let [di, dj] of directions) {
        const [ni, nj] = [i + di, j + dj];
        if (isIn(ni, nj)) {
            if (map[ni][nj] === 0) vacant++;
            if (likes.includes(map[ni][nj])) likesCount++;
        }
    }
    return { vacant, likesCount };
};

// 만족도 조사용 각 학생의 자리와 좋아하는 사람 메모, 학생은 1번부터 시작
const memoPlace = new Map();

for (let likeses of likesInfo) {
    const me = likeses[0];
    const likes = likeses.slice(1);
    const memo = { vacant: -1, likesCount: 0, i: 0, j: 0 };

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (map[i][j] !== 0) continue;
            const { vacant, likesCount } = inspect(i, j, likes);
            // 1. 좋아하는 학생이 가장 많은 칸 갱신. 같은경우라면 vacant 더 많아야 함
            // 3. 둘 다 같다면 앞에서 갱신한 게 3번기준 만족이므로 갱신 X
            if (
                likesCount > memo.likesCount ||
                (likesCount === memo.likesCount && vacant > memo.vacant)
            ) {
                memo.vacant = vacant;
                memo.likesCount = likesCount;
                memo.i = i;
                memo.j = j;
            }
        }
    }

    map[memo.i][memo.j] = me;
    memoPlace.set(me, { i: memo.i, j: memo.j, likes: likes });
}

let answer = 0;
// 만족도 조사
for (let n = 1; n < N ** 2 + 1; n++) {
    const { i, j, likes } = memoPlace.get(n);
    const { vacant, likesCount } = inspect(i, j, likes);
    if (likesCount !== 0) {
        answer += 10 ** (likesCount - 1);
    }
}

console.log(answer);
