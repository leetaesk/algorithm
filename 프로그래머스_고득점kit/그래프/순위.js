function solution(n, results) {
    const graph = Array.from({ length: n + 1 }, () =>
        Array.from({ length: n + 1 }, () => 0)
    );

    for (let [winner, loser] of results) {
        graph[winner][loser] = 1;
        graph[loser][winner] = -1;
    }

    for (let k = 1; k <= n; k++) {
        for (let i = 1; i <= n; i++) {
            for (let j = 1; j <= n; j++) {
                if (graph[i][k] === 1 && graph[k][j] === 1) {
                    graph[i][j] = 1;
                    graph[j][i] = -1;
                }
            }
        }
    }

    let answer = 0;
    for (let i = 1; i <= n; i++) {
        let isCount = true;
        for (let j = 1; j <= n; j++) {
            if (i !== j && graph[i][j] === 0) {
                isCount = false;
                break;
            }
        }
        if (isCount) answer++;
    }

    return answer;
}

console.log(
    solution(5, [
        [4, 3],
        [4, 2],
        [3, 2],
        [1, 2],
        [2, 5],
    ])
); // 예상 출력: 2
