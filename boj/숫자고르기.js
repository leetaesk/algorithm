const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = `7
3
1
1
5
5
4
6`
    .toString()
    .trim()
    .split("\n");

const N = Number(input[0]);
const arr = input.slice(1).map(Number);
// 완전탐색으로 푼다고 가정했을 때 N개 중에서 -.... 절대 안 됨
// dfs+백트래킹으로 가봅시다.

const graph = Array.from({ length: N + 1 }, () => new Set());
for (let i = 0; i < N; i++) {
    // 1-based니까 인덱스+1
    let topNode = i + 1;
    let currentNode = arr[i];
    // 양방향그래프 -> 단방향으로 변경
    graph[topNode].add(currentNode);
}

// 중복방지 set
let answer = new Set();
const visited = Array.from({ length: N + 1 }, () => false);

const dfs = (current, origin, paths) => {
    const nexts = graph[current];

    for (let next of [...nexts.keys()]) {
        if (next === origin) {
            // 애초에 paths가 필요없다! 1->3->5->1로 돌아온다면 1만 넣으면 됨
            // 3에서도 탐색하고 5에서도 탐색할 것이기 때문...이렇게 하면 answer를 set으로 할 필요도 없음 ㅇㅇ
            paths.forEach((v) => {
                answer.add(v);
            });
            // forEach내부 return은 dfs를 종료시키지 못함
            return;
        }

        if (visited[next] === false) {
            visited[next] = true;
            dfs(next, origin, [...paths, next]);
            visited[next] = false;
        }
    }
};

for (let i = 1; i <= N; i++) {
    dfs(i, i, [i]);
}

console.log(answer.size);
console.log([...answer.keys()].sort((a, b) => a - b).join("\n"));
