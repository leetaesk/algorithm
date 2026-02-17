const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = `5 0
-7 -3 -2 5 8`
    .toString()
    .trim()
    .split("\n");

const [N, S] = input[0].split(" ").map(Number);
const array = input[1].split(" ").map(Number);

let answer = 0;

const dfs = (index, currentSum) => {
    if (index === N) {
        return;
    }

    const sumWithCurrent = currentSum + array[index];

    if (sumWithCurrent === S) {
        answer++;
    }

    dfs(index + 1, sumWithCurrent);
    dfs(index + 1, currentSum);
};

dfs(0, 0);

console.log(answer);
