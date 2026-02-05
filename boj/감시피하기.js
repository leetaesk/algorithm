// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const input = `5
X S X X T
T X S X X
X X X X X
X T X X X
X X T X X`
    .trim()
    .split("\n");

const N = Number(input[0]);
const map = input.slice(1).map((i) => i.split(" "));

const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
];

const teachers = [];
const vacant = [];

for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
        // T나 S가 있으면 방문처리
        if (map[i][j] === "T") {
            teachers.push([i, j]);
            // T와 S가 붙어있다면 바로 'NO'리턴
            for (let [di, dj] of directions) {
                const [ni, nj] = [i + di, j + dj];
                if (map[ni]?.[nj] === "S") {
                    console.log("NO");
                    return;
                }
            }
        } else if (map[i][j] === "X") {
            vacant.push([i, j]);
        }
    }
}

const isIn = (i, j) => i >= 0 && i < N && j >= 0 && j < N;

const Inspect = (i, j) => {
    let dist = 1;
    let isCan = true;
    for (let [di, dj] of directions) {
        let [ni, nj] = [i + di, j + dj];
        while (isIn(ni, nj)) {
            // 학생발견
            if (map[ni][nj] === "S") {
                isCan = false;
                break;
            }
            // 장애물있으면 다음방향
            if (map[ni][nj] === "O") {
                break;
            }

            // ni,nj증가
            dist++;
            [ni, nj] = [i + di * dist, j + dj * dist];
        }
        // 이미 학생발견했으면 for문도 끝내기
        if (isCan === false) break;
    }
    return isCan;
};

// 장애물 3개 놓기
let isCan = false;
const setHurdle = (si, sj, count) => {
    // 답이 이미 나왔다면 종료
    if (isCan) return;

    if (count === 3) {
        for (let [ti, tj] of teachers) {
            if (Inspect(ti, tj) === false) {
                return;
            }
        }

        // 검사 후 return 이 안 되었다면 isCan이 답이 나온 것이므로
        isCan = true;
        return;
    }

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            //빈칸이고 장애물 놓은 적 없다면
            if (map[i][j] === "X") {
                map[i][j] = "O";
                setHurdle(i, j, count + 1);
                map[i][j] = "X";
            }

            if (isCan) return;
        }
    }
};

setHurdle(0, 0, 0);

console.log(isCan ? "YES" : "NO");
