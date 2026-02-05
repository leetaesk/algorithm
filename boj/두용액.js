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

const input = `5
-2 4 -99 -1 98`
    .trim()
    .split("\n");

const n = Number(input[0]);
let arr = input[1].split(" ").map(Number);

// 오름차순 정렬
arr.sort((a, b) => a - b);

// 포인터 2개
let left = 0;
let right = n - 1;

let min = Infinity;
let answerSmall = arr[0];
let answerBig = arr[n - 1];

while (left < right) {
    let smallOne = arr[left];
    let bigOne = arr[right];

    let sum = bigOne + smallOne;

    // 합이 지금까지의 최솟값보다 0에 가까울 때
    if (Math.abs(sum) < Math.abs(min)) {
        //갱신
        min = Math.abs(sum);
        answerSmall = smallOne;
        answerBig = bigOne;
    }

    if (sum < 0) {
        left++;
    } else {
        right--;
    }
}

console.log(answerSmall, answerBig);
