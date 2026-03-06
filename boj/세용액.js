const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = `7
-2 -3 -24 -6 98 100 61`
    .toString()
    .trim()
    .split("\n");

const N = Number(input[0]);
const arr = input[1].split(" ").map(Number);

// 오름차순 정렬
arr.sort((a, b) => a - b);

let minDiff = Infinity;
let answer = [];

//
for (let i = 0; i < arr.length - 2; i++) {
    let left = i + 1;
    let right = arr.length - 1;

    while (left < right) {
        let sum = arr[i] + arr[left] + arr[right];

        // 0에 더 가까운 값을 찾았다면 최솟값 갱신 및 정답 배열 저장
        if (Math.abs(sum) < minDiff) {
            minDiff = Math.abs(sum);
            answer = [arr[i], arr[left], arr[right]];
        }

        if (sum === 0) {
            break;
        } else if (sum < 0) {
            left++;
        } else {
            right--;
        }
    }

    if (minDiff === 0) break;
}

console.log(answer.join(" "));
