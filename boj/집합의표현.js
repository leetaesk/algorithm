/**
 * 이거 다익스트라 아님?
 */
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const input = `7 8
0 1 3
1 1 7
0 7 6
1 7 1
0 3 7
0 4 2
0 1 1
1 1 1`
    .trim()
    .split("\n");

const [n, m] = input[0].split(" ").map(Number);
const commands = input.slice(1).map((s) => s.split(" ").map(Number));

let answer = [];

const parents = Array.from({ length: n + 1 }, (_, i) => new Set().add(i));

for (let comm of commands) {
    const [command, a, b] = [
        comm[0],
        Math.min(comm[1], comm[2]),
        Math.max(comm[1], comm[2]),
    ];

    // 합집합
    if (command === 0) {
        // 작은 숫자의 set에 b랑 b의 자식들을 모두 넣음
        for (let child of parents[b]) {
            parents[a].add(b);
        }
        parents[a].add(b);
        // 합쳐진 b의 자리에는 부모를 남김
        parents[b] = a;
    }

    // 같은집합인지 확인
    if (command === 1) {
        // 같은 숫자라면 바로 yes
        if (a === b) {
            answer.push("yes");
            continue;
        }

        // 자식이라면

        answer.push(parents[a].has(b) ? "yes" : "no");
    }
}

console.log(answer.join("\n"));
