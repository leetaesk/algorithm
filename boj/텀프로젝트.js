const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const input = `2
7
3 1 3 7 3 4 6
8
1 2 3 4 5 6 7 8`
    .toString()
    .trim()
    .split("\n");

const T = Number(input[0]);
const answers = [];
let lineIdx = 1;

for (let i = 0; i < T; i++) {
    const N = Number(input[lineIdx]);
    const arr = input[lineIdx + 1].split(" ").map(Number);
    arr.unshift(0); // 1-based indexing을 위해 0 추가
    lineIdx += 2;

    const visited = new Array(N + 1).fill(false);
    const finished = new Array(N + 1).fill(false);
    let cycleNodeCount = 0;

    for (let k = 1; k <= N; k++) {
        // 이미 완전히 탐색이 끝난 노드라면 쳐다볼 필요도 없음
        if (visited[k]) continue;

        let current = k;
        const path = []; // 이번 탐색의 경로를 순서대로 저장할 배열

        // 재귀 대신 while문을 써서 콜스택 에러 완벽 차단!
        while (true) {
            visited[current] = true;
            path.push(current);

            const next = arr[current];

            if (!visited[next]) {
                current = next;
            } else {
                // 다음 노드를 이미 방문했는데, 아직 완전히 끝난 노드가 아니라면 사이클 발견!
                if (!finished[next]) {
                    // path 배열에서 사이클이 시작된 지점의 인덱스를 찾음
                    const cycleStartIndex = path.indexOf(next);
                    // 전체 경로 길이에서 시작 인덱스를 빼면 정확히 사이클을 이루는 학생 수가 나옴
                    cycleNodeCount += path.length - cycleStartIndex;
                }
                // 이미 방문한 곳을 쳤다는 건 더 이상 전진할 곳이 없다는 뜻이므로 탐색 종료
                break;
            }
        }

        // 경로 추적이 끝났으므로, 이번에 방문했던 모든 노드들을 '완료(finished)' 처리
        for (const node of path) {
            finished[node] = true;
        }
    }

    answers.push(N - cycleNodeCount);
}

console.log(answers.join("\n"));
