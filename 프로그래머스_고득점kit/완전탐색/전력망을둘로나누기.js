/**
 * 실수포인트 1 => graph문제에서 양방향연결을 안햇음!!
 * 2 => 1번노드를 기준으로 섬개수만 세주고, 나머지는 n에서 섬개수를 빼주면 시간을 거의 뭐 ㅈㄴ게 줄일 수 있음
 */
function solution(n, wires) {
    let answer = Infinity; // 최솟값을 구해야 하므로 무한대로 초기화

    // [헬퍼 함수] 특정 전선(cutWire)이 없다고 가정하고 연결된 노드 개수 세기
    const getCount = (cutWire) => {
        // 1. 그래프 생성 (자른 전선 제외)
        const graph = Array.from({ length: n + 1 }, () => []);
        for (const [u, v] of wires) {
            if (u === cutWire[0] && v === cutWire[1]) continue; // 이 전선은 패스(끊음)
            graph[u].push(v);
            graph[v].push(u);
        }

        // 2. BFS 탐색 (1번 노드부터 시작)
        const visited = Array.from({ length: n + 1 }, () => false);
        const queue = [1]; // 1번 송전탑에서 시작
        visited[1] = true; // [중요] 큐에 넣자마자 방문 처리
        let count = 0;

        while (queue.length > 0) {
            const now = queue.shift();
            count++;

            // 아까 만든 graph를 사용 (arr 반복 X)
            for (const next of graph[now]) {
                if (!visited[next]) {
                    visited[next] = true; // [중요] 큐에 넣을 때 방문 처리
                    queue.push(next);
                }
            }
        }
        return count; // 1번과 연결된 송전탑 개수 반환
    };

    // 3. 모든 전선을 하나씩 끊어보며 완전 탐색
    for (const wire of wires) {
        const countA = getCount(wire); // 한쪽 전력망의 개수
        const countB = n - countA; // 다른쪽 전력망의 개수 (전체 - A)

        answer = Math.min(answer, Math.abs(countA - countB));
    }

    return answer;
}
