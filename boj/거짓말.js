const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const input = `8 5
3 1 2 7
2 3 4
1 5
2 5 6
2 6 8
1 8`
    .toString()
    .trim()
    .split("\n");

const [N, M] = input[0].split(" ").map(Number);

// 진실을 아는 사람이 있는 파티에선 거짓말을 못함.
// 진실을 아는 사람과 같이 파티를 오는 사람이 포함된 파티에서도 거짓말을 못한다.
// 진실을 아는 사람과 같이 파티를 오는 사람과 같이 파티를 오는 사람이 포함된 파티에서도 거짓말을 못하나? => 못한다
// 사이클 시발?

const knowsPeople = input[1].split(" ").map(Number);

// 진실을 아는 사람이 없다면 다구라치셈 걍 ㅋ
if (knowsPeople.length === 0) {
    console.log(M);
    return;
}

// 파티의 수가 50밖에 안됨! 50 한바퀴 => 50한바퀴 => 50한바퀴... 사람마다 다 돌아도
const knows = Array.from({ length: N + 1 }, () => false);
const visited = Array.from({ length: N + 1 }, () => false);
const queue = [];
let head = 0;
for (let i = 1; i < knowsPeople.length; i++) {
    let knowMan = knowsPeople[i];
    knows[knowMan] = true;
    visited[knowMan] = true;
    queue.push(knowMan);
}

const partys = [];
for (let i = 2; i < input.length; i++) {
    // 명수는 빼버림
    partys.push(input[i].split(" ").map(Number).slice(1));
}

while (head < queue.length) {
    // 아는사람
    const now = queue[head++];

    for (let i = 0; i < partys.length; i++) {
        const party = partys[i];
        // 아는사람이 포함된 파티라면 전부 다 큐에 넣어야 함
        let isIncludeKnows = false;
        for (let j = 0; j < party.length; j++) {
            if (knows[party[j]]) {
                isIncludeKnows = true;
                break;
            }
        }
        // 아는사람이 포함되었다면
        if (isIncludeKnows) {
            for (let j = 0; j < party.length; j++) {
                // 체크 안했던 사람만
                if (knows[party[j]] === false) {
                    knows[party[j]] = true;
                    queue.push(party[j]);
                }
            }
        }
    }
}

let answer = 0;

for (let party of partys) {
    let isIncludeKnows = false;
    for (let p of party) {
        if (knows[p]) {
            isIncludeKnows = true;
            break;
        }
    }
    if (isIncludeKnows === false) {
        answer++;
    }
}

console.log(answer);
