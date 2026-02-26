const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = `9 3 5
1 2 3
1 4 5
3 6 7
5 6 7
6 8 9`
    .toString()
    .trim()
    .split("\n");

const [N, K, M] = input[0].split(" ").map(Number);

// 출발지가 곧 목적지인 경우 (예외 처리)
if (N === 1) {
    console.log(1);
    process.exit(0);
}

// N개의 '역' 노드 + M개의 '하이퍼튜브' 노드
// 하이퍼튜브의 인덱스는 N + 1 부터 시작하도록 구성
const graph = Array.from({ length: N + M + 1 }, () => []);

for (let i = 1; i <= M; i++) {
    const stations = input[i].split(" ").map(Number);
    const tubeNode = N + i; // 하이퍼튜브 자체를 새로운 노드로 취급

    for (let j = 0; j < K; j++) {
        const station = stations[j];
        graph[station].push(tubeNode); // 역 -> 하이퍼튜브
        graph[tubeNode].push(station); // 하이퍼튜브 -> 역
    }
}

// 메모리와 속도 최적화를 위해 Int32Array 사용
const visited = new Int32Array(N + M + 1);
const queue = new Int32Array(N + M + 1);

let head = 0;
let tail = 0;

// 1번 역에서 시작
queue[tail++] = 1;
visited[1] = 1; // 거리를 1부터 시작하여 방문 체크와 거리 계산을 동시에 처리

let answer = -1;

while (head < tail) {
    const now = queue[head++];

    if (now === N) {
        // [역]-[튜브]-[역] 순서로 이동하므로,
        // 실제 거쳐간 '역'의 개수는 튜브를 포함한 총 이동 거리를 2로 나눈 몫에 1을 더한 값
        answer = Math.floor(visited[now] / 2) + 1;
        break;
    }

    const len = graph[now].length;
    for (let i = 0; i < len; i++) {
        const next = graph[now][i];

        // 방문하지 않은 곳이면 큐에 추가
        if (visited[next] === 0) {
            visited[next] = visited[now] + 1;
            queue[tail++] = next;
        }
    }
}

console.log(answer);
