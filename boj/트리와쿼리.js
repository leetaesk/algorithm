const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = `9 5 3
1 3
4 3
5 4
5 6
6 7
2 3
9 6
6 8
5
4
8`
    .toString()
    .trim()
    .split("\n");

const [N, R, Q] = input[0].split(" ").map(Number);

// 트리 인접 리스트 초기화
const tree = Array.from({ length: N + 1 }, () => []);

for (let i = 1; i < N; i++) {
    const [u, v] = input[i].split(" ").map(Number);
    tree[u].push(v);
    tree[v].push(u);
}

// 1. BFS로 탐색 순서 기록 및 부모 노드 설정
const order = [];
const parent = new Array(N + 1).fill(0);
const visited = new Array(N + 1).fill(false);

const queue = [R];
visited[R] = true;
let head = 0; // 배열의 shift()는 성능이 느리므로 투 포인터(head) 방식 사용

while (head < queue.length) {
    const curr = queue[head++];
    order.push(curr); // 방문 순서 기록

    for (const next of tree[curr]) {
        if (!visited[next]) {
            visited[next] = true;
            parent[next] = curr; // 부모-자식 관계 기록
        }
    }
}

// 2. 역순으로 순회하며 서브트리 크기 누적 (Post-order 효과)
const size = new Array(N + 1).fill(1); // 자기 자신을 포함하므로 기본 크기는 1

// order 배열의 맨 끝(리프 노드들)부터 루트 바로 직전까지 순회
for (let i = order.length - 1; i > 0; i--) {
    const curr = order[i];
    const p = parent[curr];
    size[p] += size[curr]; // 부모 노드의 서브트리 크기에 내 크기를 누적
}

// 3. 쿼리(Q) 처리
const result = [];
for (let i = 0; i < Q; i++) {
    const queryNode = Number(input[lineIdx++]);
    result.push(size[queryNode]);
}

// 결과를 한 번에 출력하여 시간 단축
console.log(result.join("\n"));
