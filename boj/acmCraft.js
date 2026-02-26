const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = `5
3 2
1 2 3
3 2
2 1
1
4 3
5 5 5 5
1 2
1 3
2 3
4
5 10
100000 99999 99997 99994 99990
4 5
3 5
3 4
2 5
2 4
2 3
1 5
1 4
1 3
1 2
4
4 3
1 1 1 1
1 2
3 2
1 4
4
7 8
0 0 0 0 0 0 0
1 2
1 3
2 4
3 4
4 5
4 6
5 7
6 7
7`
    .toString()
    .trim()
    .split("\n");

// T 파싱 시 split 대신 Number로 바로 변환
const T = Number(input[0]);
const answers = [];

let idx = 1;
for (let t = 0; t < T; t++) {
    const [N, K] = input[idx++].split(" ").map(Number);

    // 건물을 짓는 데 걸리는 시간 (맨 앞에 0 추가)
    const times = input[idx++].split(" ").map(Number);
    times.unshift(0);

    // 역방향 그래프 초기화
    const reverseGraph = Array.from({ length: N + 1 }, () => []);

    for (let i = 0; i < K; i++) {
        const [start, end] = input[idx++].split(" ").map(Number);
        // 목표 건물에서 역으로 찾아가기 위해 역방향 간선 추가
        reverseGraph[end].push(start);
    }

    const W = Number(input[idx++]);

    // 각 건물을 완성하는 데 걸리는 '총 소요 시간'을 저장할 DP 배열 (-1로 초기화)
    const memo = Array.from({ length: N + 1 }, () => -1);

    // 특정 건물(node)을 완성하는 데 걸리는 총 시간을 반환하는 DFS 함수
    function getMinTime(node) {
        // 이미 계산된 적이 있다면 그 값을 그대로 반환 (메모이제이션)
        if (memo[node] !== -1) {
            return memo[node];
        }

        let maxPrevTime = 0;

        // 현재 건물을 짓기 위해 먼저 지어야 하는(역방향 그래프의 다음 목적지) 건물들 탐색
        for (const prev of reverseGraph[node]) {
            // 선행 건물들이 완성되는 데 걸리는 총 시간 중 가장 오래 걸리는 시간을 구함
            maxPrevTime = Math.max(maxPrevTime, getMinTime(prev));
        }

        // 현재 건물의 총 완성 시간 = 내 건설 시간 + 선행 건물 중 가장 오래 걸린 시간
        memo[node] = times[node] + maxPrevTime;
        return memo[node];
    }

    // 목표 건물 W부터 DFS 탐색 시작
    answers.push(getMinTime(W));
}

console.log(answers.join("\n"));
