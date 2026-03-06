const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n')

const input = `6 3
3 1 4 3
4 6 2 5 4
2 2 3`
    .toString()
    .trim()
    .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const turns = input.slice(1).map((s) => s.split(" ").map(Number));

const graph = Array.from({ length: N + 1 }, () => []);
const depth = Array(N + 1).fill(0);

for (let turn of turns) {
    for (let i = 1; i < turn.length - 1; i++) {
        let start = turn[i];
        let end = turn[i + 1];
        graph[start].push(end);
        depth[end]++;
    }
}

const queue = [];
let head = 0;
for (let i = 1; i < depth.length; i++) {
    const dep = depth[i];
    if (dep === 0) {
        queue.push(i);
    }
}

let answers = [];

while (head < queue.length) {
    const now = queue[head++];
    answers.push(now);

    for (let next of graph[now]) {
        depth[next]--;

        if (depth[next] === 0) {
            queue.push(next);
        }
    }
}

console.log(answers.length === N ? answers.join("\n") : 0);
