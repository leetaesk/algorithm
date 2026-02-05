const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const input = `BAAAAABAA
BAABAAAAAB`
    .toString()
    .trim()
    .split("\n");

const S = input[0];
const T = input[1];

let isTrue = false;

const dfs = (str) => {
    if (str.length > T.length) return;

    if (str === T) {
        isTrue = true;
        return;
    }

    let reversed = "";
    for (let i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }
    if (!T.includes(str) || !T.includes(reversed)) return;

    dfs(str + "A");
    dfs("B" + reversed);
};

dfs(S);

console.log(isTrue ? 1 : 0);
