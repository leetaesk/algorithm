const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = `5
1 2
2 3
3 4
4 5
2 4
5 3
-1 -1`
    .toString()
    .trim()
    .split("\n");

const N = Number(input[0]);

const dist = Array.from({ length: N + 1 }, () => Array(N + 1).fill(Infinity));
for (let i = 1; i <= N; i++) dist[i][i] = 0;

for (let i = 1; i < input.length; i++) {
    const line = input[i].trim();
    if (line === "-1 -1" || line === "") break;

    const [a, b] = line.split(" ").map(Number);

    dist[a][b] = 1;
    dist[b][a] = 1;
}

for (let k = 1; k <= N; k++) {
    for (let i = 1; i <= N; i++) {
        for (let j = 1; j <= N; j++) {
            dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
        }
    }
}

let minScore = Infinity;
const scores = new Array(N + 1).fill(0);

for (let i = 1; i <= N; i++) {
    let maxDist = 0;
    for (let j = 1; j <= N; j++) {
        if (dist[i][j] !== Infinity) {
            maxDist = Math.max(maxDist, dist[i][j]);
        }
    }
    scores[i] = maxDist;
    minScore = Math.min(minScore, maxDist);
}

const candidates = [];
for (let i = 1; i <= N; i++) {
    if (scores[i] === minScore) {
        candidates.push(i);
    }
}

console.log(`${minScore} ${candidates.length}`);
console.log(candidates.join(" "));
