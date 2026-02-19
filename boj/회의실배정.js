const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = `11
1 4
3 5
0 6
5 7
3 8
5 9
6 10
8 11
8 12
2 13
12 14`
    .toString()
    .trim()
    .split("\n");

const N = Number(input[0]);
const meetings = input.slice(1).map((s) => s.split(" ").map(BigInt));

// 회의 끝나는시간을 기준으로 정렬
meetings.sort((a, b) => {
    if (a[1] === b[1]) return a[0] - b[0] > 0 ? 1 : -1;
    return a[1] - b[1] > 0 ? 1 : -1;
});

let count = 0;
let 지금진행중인회의끝나는시간 = 0;
for (let [start, end] of meetings) {
    if (start >= 지금진행중인회의끝나는시간) {
        count++;
        지금진행중인회의끝나는시간 = end;
    }
}

console.log(count);
