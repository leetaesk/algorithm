/**
 * 정렬로직 => 수,등장횟수를 넣기 => 등장횟수적은순, 수작은순
 * 모든 행or열에 대하여 정렬수행시 가장 큰 길이를 기준으로 변한다. null인 칸에는 0이 채워진다.
 * 행 or 열의 길이가 100을 넘어가면 100개를 제외한 나머지는 버린다.
 */
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const input = `1 2 3
1 2 1
2 1 3
3 3 3`
    .trim()
    .split("\n");

const [r, c, k] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((s) => s.split(" ").map(Number));

let char = arr[r - 1][c - 1];

if (char === k) {
    console.log(0);
    return;
}

let count = 0;

let longestRow = 3;
let longestCol = arr[0].length;

while (count <= 100) {
    count++;

    // R연산 (행이 열 이상일 떄)
    if (longestRow >= longestCol) {
        for (let i = 0; i < arr.length; i++) {
            let map = new Map();
            let row = arr[i];
            for (let num of row) {
                map.set(num, (map.get(num) || 0) + 1);
            }
            // 1. Map의 entries를 배열로 변환
            // 2. 문제 조건에 맞춰 정렬 (빈도수 오름차순 -> 숫자 오름차순)
            let sortedArray = [...map.entries()].sort((a, b) => {
                if (a[1] === b[1]) {
                    return a[0] - b[0]; // 빈도수가 같으면 숫자(Key) 오름차순
                }
                return a[1] - b[1]; // 빈도수(Value) 오름차순
            });
            arr[i] = sortedArray.flat();
        }
    } else {
    }

    char = arr[r - 1][c - 1];

    if (char === k) {
        console.log(count);
        return;
    }
}

console.log(-1);
