const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const input = `10
1 5 2 1 4 3 4 5 2 1`
    .toString()
    .trim()
    .split("\n");

const N = Number(input[0]);
const arr = input[1].split(" ").map(Number);

// 각 위치의 LIS 길이를 저장할 배열 (모든 원소는 자기 자신만으로 길이 1을 가짐)
const dpIncrease = Array(N).fill(1);
const dpDecrease = Array(N).fill(1);

// 1. 왼쪽 -> 오른쪽으로 LIS 구하기
for (let i = 0; i < N; i++) {
    // 내 왼쪽 탐색
    for (let j = 0; j < i; j++) {
        if (arr[i] > arr[j]) {
            dpIncrease[i] = Math.max(dpIncrease[i], dpIncrease[j] + 1);
        }
    }
}

// 2. 오른쪽 -> 왼쪽으로 역 LIS(감소 수열) 구하기
// i를 맨 뒤(N-1)부터 거꾸로 앞으로 오면서 봅니다.
for (let i = N - 1; i >= 0; i--) {
    // j는 맨 뒤(N-1)부터 내 바로 오른쪽(i+1)까지만 봅니다.
    for (let j = N - 1; j > i; j--) {
        // 내(i)가 오른쪽 놈(j)보다 크면 내리막길 성립!
        if (arr[i] > arr[j]) {
            dpDecrease[i] = Math.max(dpDecrease[i], dpDecrease[j] + 1);
        }
    }
}

// 3. 모든 노드를 산봉우리로 가정해보고 최댓값 찾기
let answer = 0;

for (let i = 0; i < N; i++) {
    answer = Math.max(answer, dpIncrease[i] + dpDecrease[i] - 1);
}

console.log(answer);
