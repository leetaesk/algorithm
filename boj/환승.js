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

// 환승횟수 + 1 이 답임 ㅇㅇ
let answer = -1;

// 양방향 그래프인듯? ㄴㄴ 단방향임. 중복 제거 set사용 => 양방향인듯 ㅋ
let graph = Array.from({ length: N + 1 }, () => new Set());

for (let i = 1; i < input.length; i++) {
    const arr = input[i].split(" ").map(Number);

    for (let left = 0; left < arr.length; left++) {
        for (let right = left + 1; right < arr.length; right++) {
            if (arr[left] === arr[right]) continue;
            graph[arr[left]].add(arr[right]);
            graph[arr[right]].add(arr[left]);
        }
    }
}

const visited = Array.from({ length: N + 1 }, () => false);
let queue = [];
queue.push(1);
visited[1] = true;

// 환승센터갯수.
let count = 0;

// console.log(graph);
while (queue.length > 0) {
    let isFound = false;
    let nextqueue = [];

    while (queue.length > 0) {
        let now = queue.shift();

        // 현재역에서 갈 수 있는 곳들
        for (let next of graph[now]) {
            // 목적지임! 환승횟수 + 출발,도착역
            if (next === N) {
                answer = count + 2;
                isFound = true;
                break;
            }

            // 목적지 아닌데 방문한 적 없음 => nextQueue에 넣기
            if (visited[next] === false) {
                visited[next] = true;
                nextqueue.push(next);
            }
        }

        if (isFound) break;
    }
    if (isFound) break;

    // 큐를 한바퀴 다 돌았는데도 못찾았음 => queue갱신
    for (let station of nextqueue) {
        queue.push(station);
    }

    count++;
}

console.log(answer);
