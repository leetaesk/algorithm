/**
 * 1.모든 파이어볼이 자신의 방향 di로 속력 si칸 만큼 이동한다.
 *      이동하는 중에는 같은 칸에 여러 개의 파이어볼이 있을 수도 있다.
 * 2. 이동이 모두 끝난 뒤, 2개 이상의 파이어볼이 있는 칸에서는 다음과 같은 일이 일어난다.
 *      같은 칸에 있는 파이어볼은 모두 하나로 합쳐진다.
 *      파이어볼은 4개의 파이어볼로 나누어진다.
 *      나누어진 파이어볼의 질량, 속력, 방향은 다음과 같다.
 *          질량은 ⌊(합쳐진 파이어볼 질량의 합)/5⌋이다.
 *          속력은 ⌊(합쳐진 파이어볼 속력의 합)/(합쳐진 파이어볼의 개수)⌋이다.
 *          합쳐지는 파이어볼의 방향이 모두 홀수이거나 모두 짝수이면, 방향은 0, 2, 4, 6이 되고, 그렇지 않으면 1, 3, 5, 7이 된다.
 *      질량이 0인 파이어볼은 소멸되어 없어진다.
 */
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const input = `7 5 3
1 3 5 2 4
2 3 5 2 6
5 2 9 1 7
6 2 1 3 5
4 4 2 4 2`
    .trim()
    .split("\n");

const [N, M, K] = input[0].split(" ").map(Number);
let balls = input.slice(1).map((i) => i.split(" ").map(Number)); //[r,c,m,s,d]

const directions = [
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
];

// K번 명령
for (let order = 0; order < K; order++) {
    // balls기록 맵
    const map = Array.from({ length: N + 1 }, () =>
        Array.from({ length: N + 1 }, () => [])
    );

    // 1. 이동
    for (let i = 0; i < balls.length; i++) {
        let [r, c, m, s, d] = balls[i];
        const [di, dj] = directions[d];

        let finalR = ((((r - 1 + di * (s % N)) % N) + N) % N) + 1;
        let finalC = ((((c - 1 + dj * (s % N)) % N) + N) % N) + 1;

        // 최종 좌표 업데이트
        balls[i] = [finalR, finalC, m, s, d];

        map[finalR][finalC].push(balls[i]);
    }

    // balls를 갱신할 새로운 배열
    const newBalls = [];

    // 2. map순회하면서 파이어볼 2개 이상이면 로직 적용
    for (let i = 1; i <= N; i++) {
        for (let j = 1; j <= N; j++) {
            let now = map[i][j];
            // 파이어볼 두개 이상이면
            if (now.length > 1) {
                // 총개수
                const totalCount = now.length;
                // 총질량, 총속력
                let [tm, ts] = [0, 0];
                // 홀짝 카운트
                let [hol, jjak] = [0, 0];
                for (let [r, c, m, s, d] of now) {
                    tm += m;
                    ts += s;
                    if (d % 2 === 0) jjak++;
                    else hol++;
                }
                let isAllHolJjak = hol === 0 || jjak === 0;

                // 질량 0 이면 건너뛰기
                if (Math.floor(tm / 5) === 0) {
                    continue;
                }

                // 4개로 갈라짐
                for (let k = 0; k < 8; k += 2) {
                    // [r,c,m,s,d]
                    newBalls.push([
                        i,
                        j,
                        Math.floor(tm / 5),
                        Math.floor(ts / totalCount),
                        isAllHolJjak ? k : k + 1,
                    ]);
                }
            } else {
                // 0개든 1개든 상관없음 이케하면
                newBalls.push(...now);
            }
        }
    }

    // balls를 newBalls로 갈아치움
    balls = newBalls;
}

console.log(balls.reduce((acc, cur) => acc + cur[2], 0));
