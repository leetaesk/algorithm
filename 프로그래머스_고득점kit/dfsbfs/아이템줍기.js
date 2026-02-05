/**
 * 1. 좌표 2배 뻥튀기 후 네모칸을 전부 색칠 => 2배로 늘리면 한칸띄워져 있어서 사이가 비었는지 체크하지 못하는 애들을 판별 가능
 * 2. 전부 색칠한 사각형 내부를 지움
 * 3. bfs시작
 */
function solution(rectangle, characterX, characterY, itemX, itemY) {
    const map = Array.from({ length: 102 }, () =>
        Array.from({ length: 102 }, () => 0)
    );

    // 두배로 늘려서 전부 색칠
    for (let [x, y, xx, yy] of rectangle) {
        for (let i = x * 2; i <= xx * 2; i++) {
            for (let j = y * 2; j <= yy * 2; j++) {
                map[i][j] = 1;
            }
        }
    }

    //내부 비우기
    for (let [x, y, xx, yy] of rectangle) {
        for (let i = x * 2 + 1; i < xx * 2; i++) {
            for (let j = y * 2 + 1; j < yy * 2; j++) {
                map[i][j] = 0;
            }
        }
    }

    //bfs
    // 시작점과 방문처리 2배 잊지 않을 것
    const queue = [[characterX * 2, characterY * 2, 0]];
    map[characterX * 2][characterY * 2] = 0;
    const directions = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
    ];

    while (queue.length > 0) {
        const [x, y, distance] = queue.shift();

        if (x === itemX * 2 && y === itemY * 2) {
            // 정답은 절반임을 잊지 않을 것
            return distance / 2;
        }

        for (let [dx, dy] of directions) {
            const [nx, ny] = [x + dx, y + dy];
            if (
                nx >= 0 &&
                nx < 102 &&
                ny >= 0 &&
                ny < 102 &&
                map[nx][ny] === 1
            ) {
                map[nx][ny] = 0;
                queue.push([nx, ny, distance + 1]);
            }
        }
    }

    return -1;
}
