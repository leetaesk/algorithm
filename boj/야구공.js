/**
 * 1번선수는 무조건 4번타자임
 * 이거 그냥 완전탐색으로 조합생성문제아님? 조합말고 순열 ㅇㅇ
 */
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

/**
 * 8길이 순열 생성 함수 => 그냥 1을 끼워넣는 함수로 변경
 * 0-based로 변환
 */
let permutations = [];
let sequence = [];
const visited = Array.from({ length: 9 }, () => false);
function getPermutation(depth) {
    // 4번째라면 0번 선수을 넣어라
    if (depth === 3) {
        sequence.push(0);
        getPermutation(depth + 1);
        sequence.pop();
        return;
    }

    if (depth === 9) {
        permutations.push(sequence.slice());
        return;
    }

    // 1번 선수부터 8번 선수까지
    for (let i = 1; i <= 8; i++) {
        if (visited[i] === false) {
            visited[i] = true;
            sequence.push(i);
            getPermutation(depth + 1);
            sequence.pop();
            visited[i] = false;
        }
    }
}
getPermutation(0);
console.log(permutations);

const input = `2
0 4 4 4 4 4 4 4 4
0 4 4 4 4 4 4 4 4`
    .trim()
    .split("\n");

const N = Number(input[0]);
const arr = input.slice(1).map((i) => i.split(" ").map(Number));

let answer = 0;

// 모든 타자 경우에 대해서
for (let permutate of permutations) {
    let score = 0;
    let idx = 0;
    // 이닝 진행시켜
    for (let i = 0; i < N; i++) {
        // 이번 이닝 애새끼들 결과 hits
        let hits = arr[i];
        let bases = [];
        let out = 0;

        while (out < 3) {
            let 지금타자 = permutate[idx];
            let result = hits[지금타자];

            // 아웃
            if (result === 0) {
                out++;
            } else if (result === 4) {
                // 주자 + 타자
                score += bases.length + 1;
                bases = [];
            } else {
                // 나머지. 주자는 미리 담아놓기
                let nextBases = [result];
                for (let base of bases) {
                    let nextBase = base + result;
                    // 출루
                    if (nextBase >= 4) {
                        score++;
                    } else {
                        nextBases.push(nextBase);
                    }
                }
                bases = nextBases;
            }

            // 다음주자
            // 8이면 0. 7이면 8. 1이면 2
            idx = (idx + 1) % 9;
        }
    }

    // 이번 permutate 은 몇점이었는지 보고 answer갱신
    answer = Math.max(answer, score);
}

console.log(answer);
