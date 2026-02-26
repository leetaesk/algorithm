const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n')
const input = `5
2
3
5
10
18`
    .toString()
    .trim()
    .split("\n");

// N은 1000이하
const N = Number(input[0]);

// arr중에 3개를 골라서 더했을 때, arr에 포함된 수 중 가장 큰 수. 3개는 같아도 된다. => 같은 수는 없다고 문제에 나와있다.
// 메모이제이션 하면 충분히 가능할 거 같은데?
const arr = input.slice(1).map(Number);
// 편의성 위해서 내림차순 정렬
arr.sort((a, b) => b - a);

// 두 수의 합을 그냥 다 넣어버려 ㅅㅂ
const memo = new Set();

// 제곱순회 백만.
for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
        memo.add(arr[i] + arr[j]);
    }
}

let answer = 0;
// 제곱순회 백만
for (let i = 0; i < N; i++) {
    let targetSum = arr[i];
    for (let j = i + 1; j < N; j++) {
        let one = arr[j];
        if (memo.has(targetSum - one)) {
            answer = targetSum;
            break;
        }
    }
    if (answer > 0) break;
}

console.log(answer);
