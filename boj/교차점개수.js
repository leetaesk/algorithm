const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = `10
3 5 4 7
1 7 2 8
2 4 2 7
2 6 4 4
1 5 3 3`
    .toString()
    .trim()
    .split("\n");

const N = Number(input[0]);
const K = N / 2;
const lines = [];
const OFFSET = 1000000;

function getPos(side, dist) {
    if (side === 1) return dist;
    if (side === 4) return OFFSET + dist;
    if (side === 2) return 2 * OFFSET - dist;
    if (side === 3) return 3 * OFFSET - dist;
    return 0;
}

for (let i = 1; i <= K; i++) {
    const [s1, d1, s2, d2] = input[i].trim().split(/\s+/).map(Number);
    const p1 = getPos(s1, d1);
    const p2 = getPos(s2, d2);
    lines.push(p1 < p2 ? [p1, p2] : [p2, p1]);
}

let totalCross = 0;
let maxCross = 0;

for (let i = 0; i < K; i++) {
    let currentCount = 0;
    for (let j = 0; j < K; j++) {
        if (i === j) continue;
        const [a1, a2] = lines[i];
        const [b1, b2] = lines[j];

        if (
            (a1 < b1 && b1 < a2 && a2 < b2) ||
            (b1 < a1 && a1 < b2 && b2 < a2)
        ) {
            currentCount++;
        }
    }
    totalCross += currentCount;
    if (currentCount > maxCross) maxCross = currentCount;
}

console.log(totalCross / 2);
console.log(maxCross);
