const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = `5
-99 -2 -1 4 98`
    .toString()
    .trim()
    .split("\n");

const N = Number(input[0]);
const arr = input[1].split(" ").map(Number);

arr.sort((a, b) => a - b);

let min = Infinity;

let answer = Array.from({ length: 2 }, () => 0);

let left = 0;
let right = N - 1;

while (left < right) {
    let sum = arr[left] + arr[right];

    if (Math.abs(sum) < min) {
        min = Math.abs(sum);
        answer[0] = arr[left];
        answer[1] = arr[right];
    }

    if (sum === 0) {
        break;
    } else if (sum > 0) {
        right--;
    } else {
        left++;
    }
}

console.log(answer.join(" "));
