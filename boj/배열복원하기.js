// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const input = `3 3 2 1
1 2 3 0
4 5 6 0
7 9 11 3
0 4 5 6
0 7 8 9`
    .trim()
    .split("\n");

const [H, W, X, Y] = input[0].split(" ").map(Number);
const map = input.slice(1).map((s) => s.split(" ").map(Number));

// new Array(length).fill(0) 같은 거는 걍 쓰지 않기로. 시간복잡도 상 동일하며 fill은 객체나 배열 생성 시 같은 주소 참조 => 위험
const answer = Array.from({ length: H }, () =>
    Array.from({ length: W }, () => 0)
);

// 밑으로X, 오른쪽으로 Y칸 옮긴것
for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
        // 1. 일단 현재 map의 값을 가져옵니다. (겹치지 않았다면 이 자체가 원본)
        answer[i][j] = map[i][j];

        // 2. 만약 현재 위치가 겹친 부분(X, Y만큼 이동해온 잔상이 있는 부분)이라면?
        //    => 이동해오기 전의 원본 값(answer[i-X][j-Y])을 빼줍니다.
        // answer[i-X][j-Y] 는 이미 원본계산이 끝난 값이기 때문에 항상 원본임
        if (i >= X && j >= Y) {
            answer[i][j] -= answer[i - X][j - Y];
        }
    }
}

// 콘솔로그는 딱 한 번 호출하여 내부 문자열을 조작
console.log(answer.map((row) => row.join(" ")).join("\n"));
