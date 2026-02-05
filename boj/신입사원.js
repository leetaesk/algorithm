// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const input = `2
5
3 2
1 4
4 1
2 3
5 5
7
3 6
7 3
4 2
1 4
5 7
2 5
6 1`
    .toString()
    .trim()
    .split("\n");

const T = Number(input[0]);
let answers = [];
let idx = 1;

while (idx < input.length) {
    let now = Number(input[idx]);
    let testCase = [];

    // 배열 생성 최적화 (slice 대신 직접 push)
    for (let k = 0; k < now; k++) {
        testCase.push(input[idx + 1 + k].split(" ").map(Number));
    }

    // 1. 서류 등수 기준 오름차순 정렬 (1등부터 N등까지)
    testCase.sort((a, b) => a[0] - b[0]);

    // 2. 그리디 알고리즘 적용
    // 서류 1등은 무조건 선발되므로 count = 1로 시작
    let count = 1;
    let minInterviewRank = testCase[0][1]; // 현재까지 발견된 가장 좋은(낮은) 면접 등수

    for (let i = 1; i < testCase.length; i++) {
        const currentInterviewRank = testCase[i][1];

        // 내 면접 등수가 현재까지의 최소 면접 등수보다 작다면(좋다면) 선발
        if (currentInterviewRank < minInterviewRank) {
            count++;
            minInterviewRank = currentInterviewRank; // 최소 등수 갱신
        }
    }

    answers.push(count);
    idx = idx + now + 1;
}

console.log(answers.join("\n"));
