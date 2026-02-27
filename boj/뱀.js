const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = `10
5
1 5
1 3
1 2
1 6
1 7
4
8 D
10 D
11 D
13 L`
    .toString()
    .trim()
    .split("\n");

const N = Number(input[0]);
const K = Number(input[1]);
// 좌표는 1-based
const apples = [];
for (let i = 2; i < 2 + K; i++) {
    apples.push(input[i].split(" ").map(Number));
}
const L = Number(input[2 + K]);
const commands = [];
// commands에는 형변환해서 넣어버림. X가 10,000 이하라 큐 구현안해도 될 듯
for (let i = 3 + K; i < input.length; i++) {
    const [secStr, direction] = input[i].split(" ");
    const sec = Number(secStr);
    commands.push([sec, direction]);
}

// 좌표일치. 1-based이고 빈땅은0. 사과는 1로 체크. 뱀은 2로 체크.
const map = Array.from({ length: N + 1 }, () =>
    Array.from({ length: N + 1 }, () => 0),
);

for (let [i, j] of apples) {
    map[i][j] = 1;
}
map[1][1] = 2;

// baam의 좌표를 배열로 표현함. 0이 꼬리. 끝이 머리.
let baam = [[1, 1]];

// 방향. 왼쪽은 1-. 오른쪽은 1증가시키기. 초기 오른쪽 봄
let directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
];
let dirIdx = 0;
const isIn = (i, j) => i >= 1 && i <= N && j >= 1 && j <= N;

// 방향전환 head
let commandIdx = 0;

// 그냥 10,000번 루프돌자. 방향전환 마지막이 10000이고 맵최대가 100이기때문에 10100에는 무조건 게임 끝남
for (let now = 1; now <= 10110; now++) {
    // 몸길이를 늘려 머리를 다음칸에 위치시킨다.
    let [ci, cj] = baam[baam.length - 1];
    let [di, dj] = directions[dirIdx];
    let [ni, nj] = [ci + di, cj + dj];

    // 벽이나 자기자신의 몸과 부딪히면 끝
    if (isIn(ni, nj) === false || map[ni][nj] === 2) {
        console.log(now);
        break;
    }

    // 안 끝났다면 뱀 업데이트
    baam.push([ni, nj]);

    // 이동한 칸에 사과가 있다면
    if (map[ni][nj] === 1) {
        // 뱀으로 업데이트
        map[ni][nj] = 2;
    } else if (map[ni][nj] === 0) {
        map[ni][nj] = 2;
        // 사과 못 먹었음 꼬리제거
        let [tailI, tailJ] = baam.shift();
        map[tailI][tailJ] = 0;
    }

    // 방향 전환. 바꿀때가 되었다면
    if (commandIdx < commands.length && commands[commandIdx][0] === now) {
        // 나머지연산 까먹었따 시발!!
        if (commands[commandIdx][1] === "D") {
            // dirIdx++;
            dirIdx = (dirIdx + 1) % 4;
        } else {
            // dirIdx--;
            dirIdx = (dirIdx + 3) % 4;
        }
        commandIdx++;
    }
}
