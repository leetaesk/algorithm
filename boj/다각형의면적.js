const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = `4
0 0
0 10
10 10
10 0`
    .toString()
    .trim()
    .split("\n");

const N = Number(input[0]);
const x = [];
const y = [];

// 좌표 입력받기
for (let i = 1; i <= N; i++) {
    const [currX, currY] = input[i].trim().split(" ").map(Number);
    x.push(currX);
    y.push(currY);
}

// 공식 적용을 위해 마지막에 첫 번째 점을 추가해 다각형을 닫아줍니다.
x.push(x[0]);
y.push(y[0]);

let area = 0;

// 신발끈 공식 계산
for (let i = 0; i < N; i++) {
    area += x[i] * y[i + 1];
    area -= x[i + 1] * y[i];
}

// 절댓값을 씌우고 2로 나눈 뒤, 소수점 첫째 자리까지 반올림하여 출력
const finalArea = Math.abs(area) / 2;
console.log(finalArea.toFixed(1));

/**
 * 신발끈공식... 모의고사때나 알던건데 ㅅㅂ ㅋㅋ
 * toFixed 반올ㄹ림 메서드. 이거 까먹었었네 나
 */
