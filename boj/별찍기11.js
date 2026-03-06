const fs = require("fs");
// const input = Number(fs.readFileSync("/dev/stdin").toString().trim())

const input = 24;
let kk = input / 3;
let k = 0;
while (kk > 1) {
    k++;
    kk /= 2;
}

const getStar = (n) => {
    if (n === 0) {
        return [`  *  `, ` * * `, `*****`];
    }

    const before = getStar(n - 1);
    const leng = before[before.length - 1].length * 2 + 1;

    const stars = [];

    // 이전
    for (let i = 0; i < before.length; i++) {
        let now = before[i];
        now = now.padStart(leng - now.length / 2, " ");
        now = now.padEnd(leng, " ");
        stars.push(now);
    }

    // 밑칸
    for (let i = 0; i < before.length; i++) {
        let now = before[i];
        stars.push(now + " " + now);
    }

    return stars;
};

console.log(getStar(k).join("\n"));
