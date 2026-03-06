const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = `10 15
5 1 3 5 10 7 4 9 2 8`
    .toString()
    .trim()
    .split("\n");

// N십만 S 1억
const [N, S] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

let left = 0;
let right = 0;
let answer = Infinity;
let sum = arr[0];

while (left <= right && right < N) {
    // 1. 길이 1짜리 정답 조기 종료 (아주 좋은 최적화!)
    if (left === right && sum >= S) {
        console.log(1);
        return;
    }

    if (sum >= S) {
        // 2. 조건 만족 시 길이 갱신하고 left 당기기
        let nowLeng = right - left + 1;
        answer = Math.min(answer, nowLeng);
        sum -= arr[left];
        left++;
    } else {
        // 3. 조건 불만족 시 right를 '먼저' 늘리고, 범위 체크 후 더하기
        right++;
        if (right < N) {
            sum += arr[right]; // 이렇게 해야 첫 바퀴 때 arr[1]부터 똑바로 더해짐!
        }
    }
}

console.log(answer === Infinity ? 0 : answer);
