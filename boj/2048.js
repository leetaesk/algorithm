const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const input = `3
2 2 2
4 4 4
8 8 8`
    .toString()
    .trim()
    .split("\n");

// 보드크기 20
const N = Number(input[0]);
const initial = input.slice(1).map((s) => s.split(" ").map(Number));

// 한 줄에서 이동방향에 따라 어떤 배열로 바뀔지 계산해서 바뀐 배열을 리턴하는 함수

let max = 0;

const 재귀 = (map, count) => {
    // map을 탐색 => 가장 큰 숫자
    if (count === 5) {
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                max = Math.max(max, map[i][j]);
            }
        }

        return;
    }

    재귀(map, count + 1);
};
