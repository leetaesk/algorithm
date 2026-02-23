const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = `10
2 -5 2 3 -4 7 -4 0 1 -6`
    .toString()
    .trim()
    .split("\n");

const N = Number(input[0]);
const arr = input[1].split(" ").map(Number);

// 오름차순 정렬. 같은 수가 두 번 나올 수 있다.
arr.sort((a, b) => a - b);

let answer = 0;

for (let i = 0; i < arr.length; i++) {
    const base = arr[i];
    if (base > 0) break;

    let left = i + 1;
    let right = arr.length - 1;

    // 투포인터. left와 right가 같으면 3명이 아니므로 범위에서 뺀다.
    while (left < right) {
        let leftValue = arr[left];
        let rightValue = arr[right];
        let sum = leftValue + rightValue;

        // sum이 base와 같으면 세개의 합이 0
        if (base + sum === 0) {
            // left와 right가 같으면 그 사이에서 두개를 고르는 모든 경우의 수임. nC2 ㅋ
            if (leftValue === rightValue) {
                const 전체개수 = right - left + 1;
                answer += (전체개수 * (전체개수 - 1)) / 2;
                // while문 종료
                break;
            }

            // left와 right가 다르다면 3,3,3,4....6,7,7,7,7 같은 경우를 count하고 left, right를 점프
            let leftCount = 0;
            let rightCount = 0;
            while (arr[left] === leftValue) {
                leftCount++;
                left++;
            }
            while (arr[right] === rightValue) {
                rightCount++;
                right--;
            }
            // 두 카운트를 곱하는 경우의 수
            answer += leftCount * rightCount;
        }
        // sum이 base와 다를 때
        else {
            // sum + base 가 음수이면 sum이 더 커져야 함.
            if (sum + base < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
}

console.log(answer);
