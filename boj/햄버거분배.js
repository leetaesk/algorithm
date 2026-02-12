const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n')
const input = `20 1
HHPHPPHHPPHPPPHPHPHP`
    .toString()
    .trim()
    .split("\n");

const [N, K] = input[0].split(" ").map(Number);
let map = input[1].split("");

let hamburger = 0;
for (let i = 0; i < map.length; i++) {
    if (map[i] === "P") {
        for (let j = Math.max(0, i - K); j <= Math.min(i + K, N - 1); j++) {
            if (map[j] === "H") {
                hamburger++;
                map[j] = "E";
                break;
            }
        }
    }
}

console.log(hamburger);
