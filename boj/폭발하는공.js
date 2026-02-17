const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = `4
5 5 down
5 6 left
5 7 right
5 8 up`
    .toString()
    .trim()
    .split("\n");

const N = Number(input[0]);

const memo = Array.from({ length: N }, () => false);
const directions = { up: [-1, 0], down: [1, 0], right: [0, 1], left: [0, -1] };

for (let i = 1; i < input.length; i++) {
    const [i, j, dir] = input[i].split(" ");
    i = Number(i);
    j = Number(j);
    for (let j = 1; j < input.length; j++) {
        return "애매";
    }
}
