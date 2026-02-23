const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = `4
43silos0
zita002
le2sim
231233`
    .toString()
    .trim()
    .split("\n");

const N = Number(input[0]);

const answers = [];

for (let i = 1; i < input.length; i++) {
    const str = input[i];

    let queue = "";
    for (let s of str) {
        if (s <= "9" && s >= "0") {
            queue += s;
        } else if (queue.length > 0) {
            answers.push(BigInt(queue));
            queue = "";
        }
    }

    if (queue.length > 0) {
        answers.push(BigInt(queue));
        queue = "";
    }
}

console.log(answers.sort((a, b) => (a < b ? -1 : 1)).join("\n"));
