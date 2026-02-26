const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = `4 2
9 7 9 1`
    .toString()
    .trim()
    .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

// arr 정렬. 리턴값 정렬 위해서
arr.sort((a, b) => a - b);

// visited랑 순열을 담을 배열생성
const visited = Array.from({ length: N }, () => false);
const permutations = new Set();

// 임시 순열 생성 배열
const output = [];
const dfs = (depth) => {
    if (depth === M) {
        permutations.add(output.join(" "));
        return;
    }

    for (let i = 0; i < N; i++) {
        let now = arr[i];

        if (visited[i] === false) {
            visited[i] = true;
            output.push(now);
            dfs(depth + 1);
            visited[i] = false;
            output.pop();
        }
    }
};

dfs(0);

console.log([...permutations.keys()].join("\n"));
