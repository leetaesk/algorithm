/**
 * 이것도 못 풀었던 문제임. 지금 생각나는 거 =>
 * rotate함수를 넣기
 * rotate다 해보면서 다 넣어보고 안되면 채운 개수를 count해서 answer를 갱신하는 dfs 문제 ! => 맞나요
 * 근데 블럭을 어떻게 형상화..? => 테트리스처럼? 내가 메모장 테트리스 만든사람 ㅋㅋ 2차원배열로 형상화했던 거 같은데
 */
function solution(game_board, table) {
    // 1. 보드의 빈 공간(0)과 테이블의 블록(1)을 각각 추출해서 2차원 배열 형태로 만듭니다.
    const emptySpaces = getShapes(game_board, 0);
    const puzzlePieces = getShapes(table, 1);

    let answer = 0;

    // 2. 빈 공간 하나씩 순회하며 맞는 조각 찾기
    for (const space of emptySpaces) {
        for (let i = 0; i < puzzlePieces.length; i++) {
            let piece = puzzlePieces[i];
            let match = false;

            // 3. 퍼즐 조각의 칸 개수가 다르면 볼 필요도 없음 (최적화)
            if (countOnes(space) !== countOnes(piece)) continue;

            // 4. 4번 회전해보며 맞는지 확인
            for (let r = 0; r < 4; r++) {
                if (isSame(space, piece)) {
                    answer += countOnes(piece); // 채워진 칸 수 더하기
                    puzzlePieces.splice(i, 1); // 사용한 조각은 목록에서 제거
                    match = true;
                    break;
                }
                piece = rotate(piece); // 90도 회전
            }

            if (match) break; // 조각을 찾았으면 다음 빈 공간으로
        }
    }

    return answer;
}

// BFS로 연결된 덩어리(shape)들을 찾아내는 함수
function getShapes(board, target) {
    const shapes = [];
    const N = board.length;
    const visited = Array.from({ length: N }, () => Array(N).fill(false));
    const dx = [0, 0, 1, -1];
    const dy = [1, -1, 0, 0];

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (board[i][j] === target && !visited[i][j]) {
                const shape = [];
                const queue = [[i, j]];
                visited[i][j] = true;
                shape.push([i, j]);

                // BFS 탐색
                let head = 0;
                while (head < queue.length) {
                    const [cx, cy] = queue[head++];
                    for (let k = 0; k < 4; k++) {
                        const nx = cx + dx[k];
                        const ny = cy + dy[k];
                        if (
                            nx >= 0 &&
                            nx < N &&
                            ny >= 0 &&
                            ny < N &&
                            board[nx][ny] === target &&
                            !visited[nx][ny]
                        ) {
                            visited[nx][ny] = true;
                            queue.push([nx, ny]);
                            shape.push([nx, ny]);
                        }
                    }
                }
                shapes.push(normalize(shape)); // (0,0) 기준으로 정규화해서 저장
            }
        }
    }
    return shapes;
}

// 추출한 좌표들을 (0,0) 기준의 직사각형 2차원 배열로 변환
function normalize(coords) {
    const minX = Math.min(...coords.map((c) => c[0]));
    const minY = Math.min(...coords.map((c) => c[1]));
    const maxX = Math.max(...coords.map((c) => c[0]));
    const maxY = Math.max(...coords.map((c) => c[1]));

    const h = maxX - minX + 1;
    const w = maxY - minY + 1;

    const shape = Array.from({ length: h }, () => Array(w).fill(0));

    coords.forEach(([x, y]) => {
        shape[x - minX][y - minY] = 1;
    });

    return shape;
}

// 2차원 배열을 시계방향 90도 회전
function rotate(matrix) {
    const row = matrix.length;
    const col = matrix[0].length;
    const newMatrix = Array.from({ length: col }, () => Array(row).fill(0));

    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            newMatrix[j][row - 1 - i] = matrix[i][j];
        }
    }
    return newMatrix;
}

// 두 모양(2차원 배열)이 완전히 같은지 비교
function isSame(a, b) {
    // JSON.stringify로 문자열 변환 후 비교하는 게 가장 빠르고 편함
    return JSON.stringify(a) === JSON.stringify(b);
}

// 블록 개수 세기 (정답 계산용)
function countOnes(matrix) {
    let count = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] === 1) count++;
        }
    }
    return count;
}
