const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = `3
1 0
5
4 2
1 2 3 4
6 0
1 1 9 1 1 1`
    .toString()
    .trim()
    .split("\n");

const answer = [];

for (let i = 1; i < input.length; i += 2) {
    // M은 0-based
    const [N, M] = input[i].split(" ").map(Number);
    const 중요도 = input[i + 1].split(" ").map(Number);

    // M번째 가 출력되면 그거 answer에 담고 끝내면 됨 ㅇㅇ
    let count = 0;
    let 중요도순서 = 중요도.slice().sort((a, b) => a - b);

    // 문서의 개수가 100개라 shift해도 시간초과 안 날 듯
    let queue = 중요도.map((i, idx) => [i, idx]);

    // 정답찾기
    while (true) {
        let best = 중요도순서[중요도순서.length - 1];
        // 중요도가 가장 높은게 앞에 있다면
        if (queue[0][0] === best) {
            if (queue[0][1] === M) {
                answer.push(count + 1);
                break;
            } else {
                queue.shift();
                중요도순서.pop();
                count++;
            }
        }
        // 아니라면
        else {
            queue.push(queue.shift());
        }
    }
}

console.log(answer.join("\n"));
