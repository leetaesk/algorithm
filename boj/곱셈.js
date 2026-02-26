const fs = require("fs");
// const [A, B, C] = fs
//     .readFileSync("/dev/stdin")
//     .toString()
//     .trim()
//     .split(" ")
//     .map(Number);

const [A, B, C] = `10 11 12`.toString().trim().split(" ").map(Number);

const BigA = BigInt(A);
const BigB = BigInt(B);
const BigC = BigInt(C);

console.log(Number(BigA ** BigB % BigC));
