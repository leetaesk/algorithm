/**
 * bfs임
 * visited를 안 쓰도록 최적화했음. 이게 되네 신기하네
 */
function solution(maps) {
    const rows = maps.length;
    const cols = maps[0].length;

    const directions = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
    ];

    const queue = [[0, 0, 1]];

    // visited안쓰고 map을 0으로 변경 => visited안쓰느 ㄴ팁
    maps[0][0] = 0;

    while (queue.length > 0) {
        const [r, c, dist] = queue.shift();

        // 도착
        if (r === rows - 1 && c === cols - 1) {
            return dist;
        }

        for (const [dr, dc] of directions) {
            const [nr, nc] = [r + dr, c + dc];

            // 범위 안 && 갈 수 있음
            if (
                nr >= 0 &&
                nr < rows &&
                nc >= 0 &&
                nc < cols &&
                maps[nr][nc] === 1
            ) {
                maps[nr][nc] = 0; // 방문 처리. 벽세워버리기
                queue.push([nr, nc, dist + 1]);
            }
        }
    }

    return -1;
}
