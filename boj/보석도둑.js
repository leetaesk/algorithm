const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const input = `2 1
5 10
100 100
11`
    .toString()
    .trim()
    .split("\n");

// 각 삼십만번
const [N, K] = input[0].split(" ").map(Number);
// jems[i] = [보석무게, 가격]
const jems = [];
for (let i = 1; i < 1 + N; i++) {
    jems.push(input[i].split(" ").map(Number));
}
const bags = [];
for (let i = 1 + N; i < input.length; i++) {
    bags.push(Number(input[i]));
}

// 가격이 높은 것부터 나를 담을 수 있는 가장 작은 가방에 담으면 됨 (무게가 8이고 10, 11을 담을 수 있는 가방이 있다면 10을 담을 수 있는 가방에)
// 근데 그 탐색과정이 시간초과. 이를 어떻게 극복할 수 있느냐....
