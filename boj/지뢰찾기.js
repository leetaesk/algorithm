const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = `2
5
11122
####*
5
23321
#####`
    .trim()
    .split("\n");

const T = Number(input[0]);

const answers = [];

for (let i = 1; i < input.length; i += 3) {
    const N = Number(input[i]);

    let nums = input[i + 1].split("").map(Number);

    let count = 0;

    for (let k = 0; k < N; k++) {
        // 1. 왼쪽 확인
        if (k > 0 && nums[k - 1] === 0) continue;

        // 2. 나 확인
        if (nums[k] === 0) continue;

        // 3. 오른쪽 확인 (마지막 칸이면 통과)
        if (k < N - 1 && nums[k + 1] === 0) continue;

        // 위 조건을 다 통과했으면 지뢰 설치!
        count++;

        // 지뢰를 설치했으니 힌트 숫자들을 1씩 깎음 (영향력 반영)
        if (k > 0) nums[k - 1]--;
        nums[k]--;
        if (k < N - 1) nums[k + 1]--;
    }

    answers.push(count);
}

console.log(answers.join("\n"));
