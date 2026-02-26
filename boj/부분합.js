const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = `16 3
3 1 4 3
4 6 2 5 4
2 2 3`
    .toString()
    .trim()
    .split("\n");

// 노드1000. M이 100인데 이거 하이퍼튜브랑 비슷한 거 같은데?
const [N, M] = input[0].split(" ").map(Number);
