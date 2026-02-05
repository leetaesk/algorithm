/**
 * 걍 섬 문제죠
 */
function solution(n, computers) {
    let count = 0;
    const visited = Array.from({ length: n }, () => false);
    for (let i = 0; i < n; i++) {
        // 들른 적 없음
        if (visited[i] === false) {
            count++;
            // 연결되어있는 거 visited 처리
            const queue = [];
            queue.push(computers[i]);
            while (queue.length > 0) {
                const now = queue.shift();
                for (let next = 0; next < n; next++) {
                    // 자기 자신일 떄 걍 continue, 필요없는코드지만 일단 넣
                    if (next === i) continue;
                    // 연결되어있고 visited가 false일 떄
                    if (now[next] === 1 && visited[next] === false) {
                        visited[next] = true;
                        queue.push(computers[next]);
                    }
                }
            }
        }
    }
    return count;
}
/**
 * 최적화 => 큐에 배열을 넣지 않고 computers[i][j]가 1일 때 j만 넣는다! => 메모리 절약
 */
function solution(n, computers) {
    let count = 0;
    const visited = Array(n).fill(false); // Array.from보다 약간 더 빠르고 간결함

    for (let i = 0; i < n; i++) {
        // 아직 방문하지 않은 컴퓨터 발견 -> 새로운 네트워크 시작
        if (!visited[i]) {
            count++;

            // BFS 시작
            const queue = [i]; // 인덱스만 넣음
            visited[i] = true; // 넣자마자 방문 처리

            while (queue.length > 0) {
                // JS 배열의 shift()는 O(N)이지만, N <= 200 이라 충분히 빠름
                const current = queue.shift();

                for (let next = 0; next < n; next++) {
                    // 1. 연결되어 있고 (computers[current][next] === 1)
                    // 2. 아직 방문 안 했으면 (!visited[next])
                    if (computers[current][next] === 1 && !visited[next]) {
                        visited[next] = true; // 큐에 넣을 때 방문 처리 (중복 방지)
                        queue.push(next);
                    }
                }
            }
        }
    }
    return count;
}
