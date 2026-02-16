const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = `4
0 1 1 0
1 2 3 4
3
2 4 7`
    .trim()
    .split("\n");

const N = Number(input[0]);
// 큐라면 0. 스택이라면 1
const A = input[1].split(" ").map(Number);
// B[i] = i번 자료구조에 들어있는 원소(하나씩 들어있는 듯?)
const B = input[2].split(" ").map(Number);
const M = Number(input[3]);
const C = input[4].split(" ").map(Number);

const result = [];

// 역순으로 탐색
// 데이터가 1번 -> N번으로 흐르기 때문에,
// 실제로 가장 먼저 pop되어 나오는 값은 '가장 뒤쪽에 배치된 큐'의 값입니다.
for (let i = N - 1; i >= 0; i--) {
    // 큐(0)인 경우만 결과 배열에 추가
    if (A[i] === 0) {
        result.push(B[i]);
    }
    // 최적화: 출력해야 할 개수(M)가 채워지면 더 이상 탐색할 필요 없음
    if (result.length === M) break;
}

// 4. 초기 큐의 값들로 M개를 채우지 못했다면, 새로 입력되는 수열 C에서 가져와 채움
let cIndex = 0;
while (result.length < M) {
    result.push(C[cIndex++]);
}

// 5. 정답 출력
console.log(result.join(" "));
