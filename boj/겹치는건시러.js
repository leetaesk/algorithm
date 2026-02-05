// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const input = `9 2
3 2 5 5 6 4 4 5 7`
    .trim()
    .split("\n");

const [N, K] = input[0].split(" ").map(Number);
const numbers = input[1].split(" ").map(Number);

// 문제 조건: 원소는 100,000 이하 -> 배열 인덱스로 카운팅 (Map보다 빠름)
const count = new Array(100001).fill(0);

let left = 0;
let right = 0;
let maxLength = 0;

while (right < N) {
    // 오른쪽 추가
    const rightNum = numbers[right];
    count[rightNum]++;

    // 방금 추가한 애가 K 이상이라면 => k이하 될 떄까지 left를 줄여
    while (count[rightNum] > K) {
        const leftNum = numbers[left];
        count[leftNum]--;
        left++;
    }

    maxLength = Math.max(maxLength, right - left + 1);
    right++;
}

console.log(maxLength);
