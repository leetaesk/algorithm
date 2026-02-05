// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const input = `Mississipi`.trim().split("");

const obj = {};

for (let char of input) {
    const Char = char.toUpperCase();
    obj[Char] = (obj[Char] || 0) + 1;
}
