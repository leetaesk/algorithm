const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const input = `XXXOO.XXX
XOXOXOXOX
OXOXOXOXO
XXOOOXXOX
XO.OX...X
.XXX.XOOO
X.OO..X..
OOXXXOOXO
end`
    .toString()
    .trim()
    .split("\n");

let answer = [];

const valid = "valid";
const invalid = "invalid";

const isTicTacToe = (param, map) => {
    // 0,3,6 || 1,4,7 || 2,5,8
    // 0,1,2 || 3,4,5 || 6,7,8
    // 0,4,8 || 2,4,6
    if (map[0] === param && map[3] === param && map[6] === param) return true;
    if (map[1] === param && map[4] === param && map[7] === param) return true;
    if (map[2] === param && map[5] === param && map[8] === param) return true;
    if (map[0] === param && map[1] === param && map[2] === param) return true;
    if (map[3] === param && map[4] === param && map[5] === param) return true;
    if (map[6] === param && map[7] === param && map[8] === param) return true;
    if (map[0] === param && map[4] === param && map[8] === param) return true;
    if (map[2] === param && map[4] === param && map[6] === param) return true;
    return false;
};

for (let i = 0; i < input.length - 1; i++) {
    let now = input[i];
    // 불가능한 경우를 찾으면 된다. 2개로 나눌 수 있음
    let countX = 0;
    let countO = 0;
    for (let k = 0; k < 9; k++) {
        if (now[k] === "X") {
            countX++;
        } else if (now[k] === "O") {
            countO++;
        }
    }
    // X가 2개 이상 더 많은 경우
    // O가 1개라도 더 많은 경우
    if (countX - countO >= 2 || countO > countX) {
        answer.push(invalid);
        continue;
    }
    // 승리상태를 판별해서 변수로 관리
    let isWinX = isTicTacToe("X", now);
    let isWinO = isTicTacToe("O", now);
    // 둘 다 승리아닌데 빈칸이 남았다면 false
    if (isWinX === false && isWinO === false && countO + countX < 9) {
        answer.push(invalid);
        continue;
    }

    // x 턴일 때
    if (countX - countO === 1) {
        // X가 더 많은데 O가 승리인 경우 => O의 턴에서 끝났어야 하기 떄문
        if (isWinO) {
            answer.push(invalid);
            continue;
        }
    } else {
        // 동일개수인데 X가 승리인 경우 => X의 턴에서 끝났어야 하기 때문.
        if (isWinX) {
            answer.push(invalid);
            continue;
        }
    }

    answer.push(valid);
}

console.log(answer.join("\n"));
