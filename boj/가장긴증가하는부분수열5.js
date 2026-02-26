const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = `6
10 20 10 30 20 50`
    .toString()
    .trim()
    .split("\n");

const N = Number(input[0]);
const A = input[1].split(" ").map(Number);

const lis = []; // LIS 길이를 구하기 위한 배열
const record = []; // 각 원소가 lis 배열의 어느 위치(인덱스)에 들어갔는지 기록

// 이분 탐색 함수 (lower_bound 구현)
function binarySearch(target) {
    let left = 0;
    let right = lis.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (lis[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return left;
}

// 1. LIS 길이 구하기 및 위치 기록
for (let i = 0; i < N; i++) {
    const num = A[i];

    // lis 배열이 비어있거나, 현재 숫자가 lis의 마지막 숫자보다 크면 그냥 뒤에 추가
    if (lis.length === 0 || lis[lis.length - 1] < num) {
        record.push(lis.length); // 들어갈 인덱스 기록
        lis.push(num);
    } else {
        // 그렇지 않다면 이분 탐색으로 들어갈 위치(자신보다 크거나 같은 첫 번째 위치)를 찾아서 교체
        const idx = binarySearch(num);
        lis[idx] = num;
        record.push(idx); // 들어간 인덱스 기록
    }
}

const maxLen = lis.length;
console.log(maxLen);

// 2. 실제 수열 역추적하기
const result = [];
let targetIdx = maxLen - 1; // 찾아야 할 lis 배열의 인덱스 (뒤에서부터)

// 원본 배열을 뒤에서부터 앞으로 순회
for (let i = N - 1; i >= 0; i--) {
    if (record[i] === targetIdx) {
        result.push(A[i]);
        targetIdx--;
    }
    if (targetIdx < 0) break; // 다 찾았으면 종료
}

// 역추적한 결과를 다시 뒤집어서(올바른 순서로) 출력
console.log(result.reverse().join(" "));
