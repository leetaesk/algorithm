const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const input = `3 4
DLLL
DRLU
RRRU`
    .toString()
    .trim()
    .split("\n");

// 천천백만
const [N, M] = input[0].split(" ").map(Number);
