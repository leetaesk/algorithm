const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = `4
-100 -2 -1 103`
    .toString()
    .trim()
    .split("\n");

const N = Number(input[0]);
const arr = input[1].split(" ").map(Number);

let answer = [0, 0];
let min = Infinity;

let left = 0;
let right = N - 1;

while (left < right) {
    let leftValue = arr[left];
    let rightValue = arr[right];
    let sum = leftValue + rightValue;

    // 갱신
    if (Math.abs(sum) < Math.abs(min)) {
        min = sum;
        answer[0] = leftValue;
        answer[1] = rightValue;
    }

    // 증감. sum이 0보다 작다면 sum을 키워야 함 => left를 증가
    if (sum < 0) {
        left++;
    } else if (sum > 0) {
        right--;
    } else {
        // 0인 경우에는? 특성값이 0에 가장 가까운 용액을 만들어내는 경우가 두 개 이상일 경우에는 그 중 아무것이나 하나를 출력한다.
        // 반복문 종료 그냥
        break;
    }
}

console.log(answer.join(" "));
