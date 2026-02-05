// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const input = `7 5 4
4 3 2 0 0
3 3 1 3 0
7 1 2 0 3
2 3 3 2 2`
    .toString()
    .trim()
    .split("\n");

const [lx, ly, n] = input[0].split(" ").map(Number);
const boxes = input.slice(1).map((s) => s.split(" ").map(Number));

// 상자들의 정보를 저장할 리스트 (좌표 기반)
// { x1, x2, y1, y2, h } 형태로 저장하여 겹침 여부만 판단
const placed = [];
let answer = 0;

for (let i = 0; i < n; i++) {
    const [x, y, z, px, py] = boxes[i];

    // 현재 상자의 범위 구하기
    const x2 = px + x;
    const y2 = py + y;

    let maxBaseHeight = 0;

    // 이전에 놓인 모든 상자들을 순회하며 겹치는지 확인 (O(N^2))
    for (let j = 0; j < placed.length; j++) {
        const p = placed[j];

        // 두 사각형이 겹치는지 확인하는 조건 (교집합이 존재하는지)
        // 겹친다면, 그 상자의 높이 중 가장 높은 것을 찾음
        if (px < p.x2 && x2 > p.x1 && py < p.y2 && y2 > p.y1) {
            if (p.h > maxBaseHeight) {
                maxBaseHeight = p.h;
            }
        }
    }

    // 가장 높은 곳 위에 현재 상자를 쌓음
    const currentHeight = maxBaseHeight + z;

    // placed 배열에 현재 상자 정보 저장
    placed.push({ x1: px, x2: x2, y1: py, y2: y2, h: currentHeight });

    // 전체 정답(최대 높이) 갱신
    if (currentHeight > answer) {
        answer = currentHeight;
    }
}

console.log(answer);
