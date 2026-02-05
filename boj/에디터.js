/**
 * 시간복잡도 0.3초 삼천만 정도
 */
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const input = `dmih
11
B
B
P x
L
B
B
B
P y
D
D
P z`
    .trim()
    .split("\n");

const string = input[0];
const M = input[1];
const commands = [];
for (let i = 2; i < input.length; i++) {
    commands.push(input[i]);
}

// 와 이런방법이 시발 ㅋㅋ
const left = string.split("");
const right = [];

// 이거자체 500,000. 문자열순회 X (시간초과)
for (let command of commands) {
    if (command === "L" && left.length > 0) {
        // 커서 왼쪽 이동 === 왼쪽 배열 pop해서 오른쪽 맨 앞에 넣기
        // 근데 맨 앞에 넣는 건 O(n)이니까 '''오른쪽은 뒤집어서 관리'''
        right.push(left.pop());
    } else if (command === "D" && right.length > 0) {
        // 커서 오른쪽 이동 == 오른쪽의 맨앞(뒤집었으니까 맨뒤, pop)을 왼쪽 맨 뒤에
        left.push(right.pop());
    } else if (command === "B" && left.length > 0) {
        // 커서 왼쪽 지우기 === left.pop()
        left.pop();
    } else if (command[0] === "P") {
        // 공백으로 구분
        const [_, newChar] = command.split(" ");
        // 커서 왼쪽에 해당 문자열 추가
        left.push(newChar);
    }
}

console.log(left.join("") + right.reverse().join(""));
