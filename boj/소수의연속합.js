const fs = require("fs");
// const input = Number(fs.readFileSync('/dev/stdin').toString().trim());

// 최대 4000000
const input = 41;

// 에라토스테네스의 채로 소수만 뽑아낸 후에 슬라이딩 윈도우로 경우의 수 구하기 ㅇㅇ
// input보다 작은 소수의 합은 없으므로 input까지. input그 자체가 소수인 경우도 있기에 이케 해야 함
const arr = new Array(input + 1).fill(true);
// 얘넨 소수 아님
arr[0] = false;
arr[1] = false;

// 소수쳐내기
for (let i = 2; i <= Math.sqrt(input); i++) {
    if (arr[i] === true) {
        for (let j = i * 2; j <= input; j += i) {
            arr[j] = false;
        }
    }
}

const primes = [];
for (let i = 2; i < arr.length; i++) {
    if (arr[i]) primes.push(i);
}

let answer = 0;

let left = 0;
let right = 0;
let sum = primes[0];

// input이 아니라 primes.l
while (left <= right && right <= primes.length) {
    if (sum === input) {
        answer++;
        // 이 경우에는 left가 증가하든 right가 증가하든 정답이 아니기 때문에 left, right를 1씩 증가시키는 게 맞다
        sum -= primes[left];
        left++;
        right++;
        sum += primes[right];
    } else if (sum < input) {
        right++;
        sum += primes[right];
    } else {
        sum -= primes[left];
        left++;
    }
}

console.log(answer);
