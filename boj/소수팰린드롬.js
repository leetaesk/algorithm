const fs = require("fs");
// const N = Number(fs.readFileSync("/dev/stdin").toString().trim());
const N = 31;

const isPallendrome = (n) => {
    return String(n) === n.toString().split("").reverse().join("");
};

const primeNumbers = Array.from({ length: 1000001 }, () => true);

for (let i = 2; i <= 1000000; i++) {
    if (primeNumbers[i] === false) continue;

    for (let k = i * 2; k <= 1000000; k += i) {
        primeNumbers[k] = false;
    }
}

let answer = 0;

for (let i = N + 1; i <= 1000000; i++) {
    if (isPallendrome(i) && primeNumbers[i] === true) {
        answer = i;
        break;
    }
}

console.log(answer);
