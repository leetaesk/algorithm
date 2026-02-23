const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = `100`.toString().trim();
const N = Number(input);

let maxLength = 0;
let maxSequence = [];

for (let i = 1; i <= N; i++) {
    const currentSeq = [N, i];

    let prev = N;
    let curr = i;

    while (true) {
        const next = prev - curr;
        if (next < 0) break;

        currentSeq.push(next);
        prev = curr;
        curr = next;
    }

    if (currentSeq.length > maxLength) {
        maxLength = currentSeq.length;
        maxSequence = currentSeq; // 참조만 바꾸므로 메모리 효율 굿
    }
}

console.log(maxLength);
console.log(maxSequence.join(" "));
