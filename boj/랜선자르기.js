const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = `4 11
802
743
457
539`
    .toString()
    .trim()
    .split("\n");

const [K, N] = input[0].split(" ").map(Number);
const pipes = input.slice(1).map((i) => BigInt(i));

// 자른 랜선의 길이. 최소는1. 최대는 모든 랜선 중 가장 짧은 것의 총길이.
let left = 1n;
let right = pipes.reduce((acc, cur) => (acc > cur ? acc : cur));

// 랜선길이의 최대값을 구하라.
while (left <= right) {
    // 일단 Math.flooor => BigInt는 Math.floor안 먹을뿐더러. 소수점을 버리기 때문에 필요없음
    let mid = (left + right) / 2n;

    // mid로 랜선의 개수를 구함
    let total = 0n;
    for (let p of pipes) {
        total += p / mid;
    }

    // 총 개수가 덜 만들어졌다면? 너무 김. 짧게 해야 함
    if (total < BigInt(N)) {
        right = mid - 1n;
    }
    // 총 개수가 그 이상이라면? 더 길게 할수 있을 듯
    else {
        left = mid + 1n;
    }
}

console.log(right.toString());
