const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = `AB
ABB`
    .toString()
    .trim()
    .split("\n");

let S = input[0].split("");
let T = input[1].split("");

// 뒤에A를 추가한다. 뒤집고 뒤에 B를 추가한다. 로 S를 T로 만들 수 있는가?
// T에서 ===> 맨 뒤에 A를 뺀다. 맨 뒤에 B를 빼고 뒤집는다. 이거 아님??
while (T.length > S.length) {
    const Tleng = T.length;
    const Sleng = S.length;
    if (T[Tleng - 1] === "A") {
        T = T.slice(0, Tleng - 1);
    } else {
        T = T.slice(0, Tleng - 1);
        T = T.reverse();
    }
}

console.log(T.join("") === S.join("") ? 1 : 0);
