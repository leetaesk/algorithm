const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = `4 2
9 8 7 1`
    .toString()
    .trim()
    .split("\n");

const [N, M] = input[0].split(" ").map(Number);

// 1. 입력받은 배열을 시작하기 전에 미리 오름차순 정렬!
const arr = input[1]
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);

const permutations = [];
const visited = Array.from({ length: N }, () => false);
const output = [];

const getPermutation = (depth) => {
    if (depth === M) {
        // 이미 오름차순으로 탐색했으므로 그냥 넣으면 됩니다.
        permutations.push(output.join(" "));
        return;
    }

    for (let i = 0; i < N; i++) {
        if (!visited[i]) {
            visited[i] = true; // 방문 처리
            output.push(arr[i]); // 값 넣기

            getPermutation(depth + 1); // 재귀 진입

            output.pop(); // 값 빼기 (백트래킹)
            visited[i] = false; // 방문 처리 취소
        }
    }
};

getPermutation(0);

// 2. 억지로 reverse() 할 필요 없이 그대로 조인해서 출력!
console.log(permutations.join("\n"));
