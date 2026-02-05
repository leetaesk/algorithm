// const fs = require("fs");
// const input = Number(fs.readFileSync("/dev/stdin").toString().trim());

const n = 10;

if (n === 1) {
    console.log(1);
    console.log(1);
    return;
}

const dp = Array.from({ length: n + 1 }, () => false);

dp[n] = 1;

let count = 1;

const nexts = [n];

while (dp[1] === false) {
    for (let next of nexts) {
        if (dp[next-1] === false) {
            dp[]
        }
    }
}
