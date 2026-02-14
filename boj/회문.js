const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = `7
abba
summuus
xabba
xabbay
comcom
comwwmoc
comwwtmoc
aaaaabaaaaa`
    .trim()
    .split("\n");

const N = Number(input[0]);
const words = input.slice(1);
const answer = [];

function check(str, left, right) {
    while (left < right) {
        if (str[left] === str[right]) {
            left++;
            right--;
        } else {
            return false;
        }
    }
    return true;
}

for (let i = 0; i < N; i++) {
    const str = words[i];
    let left = 0;
    let right = str.length - 1;
    let result = 0;

    while (left < right) {
        if (str[left] === str[right]) {
            left++;
            right--;
        } else {
            const checkLeft = check(str, left + 1, right);
            const checkRight = check(str, left, right - 1);

            if (checkLeft || checkRight) result = 1;
            else result = 2;

            break;
        }
    }
    answer.push(result);
}

console.log(answer.join("\n"));
export function solution(arr) {
    // 숫자 갯수
    const N = Math.ceil(arr.length);

    // 최대힙, 최소힙을 정의
    // maxDp[i][j] === i부터j까지의 최대값!
    const maxDp = Array.from({ length: N }, () =>
        Array.from({ length: N }, () => -Infinity),
    );
    const minDp = Array.from({ length: N }, () =>
        Array.from({ length: N }, () => Infinity),
    );

    // 자기자신세팅
    for (let i = 0; i < N; i++) {
        // 형변환필수
        const num = Number(arr[i * 2]);
        maxDp[i][i] = num;
        minDp[i][i] = num;
    }

    // 구간, i별로 반복
    for (let leng = 1; leng < N; leng++) {
        // 시작인덱스
        for (let left = 0; left < N; left++) {
            // 끝
            let right = left + leng;

            // k === left와right를 나누는기준점
            for (let k = left; k < right; k++) {
                const 연산자 = arr[k * 2 + 1];

                if (연산자 === "+") {
                    maxDp[left][right] = Math.max(
                        maxDp[left][right],
                        // left~k, k+1부터임에 주의
                        maxDp[left][k] + maxDp[k + 1][right],
                    );
                    minDp[i][j] = Math.min(
                        minDp[i][j],
                        minDp[i][k] + minDp[k + 1][j],
                    );
                } else {
                    // 뺄셈: (최대 - 최소)가 최대, (최소 - 최대)가 최소
                    maxDp[i][j] = Math.max(
                        maxDp[i][j],
                        maxDP[i][k] - minDP[k + 1][j],
                    );
                    minDP[i][j] = Math.min(
                        minDP[i][j],
                        minDP[i][k] - maxDP[k + 1][j],
                    );
                }
            }
        }
    }

    return dp(arr);
}
