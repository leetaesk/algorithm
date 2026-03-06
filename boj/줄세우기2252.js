const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n')

const input = `3 2
1 3
2 3`
    .toString()
    .trim()
    .split("\n");

const [N, M] = input[0].split(" ").map(Number);

const graph = Array.from({ length: N + 1 }, () => []);
const degree = Array.from({ length: N + 1 }, () => 0);

for (let i = 1; i < input.length; i++) {
    let [s, e] = input[i].split(" ").map(Number);
    graph[s].push(e);
    degree[e]++;
}

const answers = [];

const queue = [];
let head = 0;
for (let i = 1; i <= N; i++) {
    if (degree[i] === 0) {
        queue.push(i);
    }
}

while (head < queue.length) {
    const node = queue[head++];
    answers.push(node);

    for (let next of graph[node]) {
        degree[next]--;

        if (degree[next] === 0) {
            queue.push(next);
        }
    }
}

console.log(answers.join(" "));
