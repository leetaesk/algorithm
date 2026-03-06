const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n')

const input = `3 3
1 2 1
2 3 2
1 3 3`
    .toString()
    .trim()
    .split("\n");

// 만, 십만
const [V, E] = input[0].split(" ").map(Number);
const roads = input.slice(1).map((s) => s.split(" ").map(Number));

// 가중치 오름차순
roads.sort((a, b) => a[2] - b[2]);

const parent = Array.from({ length: V + 1 }, (_, idx) => idx);

// 부모를 찾아주는 함수
const find = (node) => {
    if (parent[node] === node) return node;
    parent[node] = find(parent[node]);
    return parent[node];
};

// 유니온 함수.
// 부모가 같다면 false를 리턴하고 다르다면 이어주는 함수
const union = (s, e, value) => {
    const parentS = find(s);
    const parentE = find(e);
    if (parentS !== parentE) {
        parent[parentE] = parentS;
        return true;
    }

    return false;
};

let sum = 0;

for (let [s, e, value] of roads) {
    // 부모가 달라서 이었음
    if (union(s, e)) {
        sum += value;
    }
}

console.log(sum);
