/**
 * 최단거리 bfs
 */
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim();

const input = `10 1 10 2 1`.trim();

const [F, S, G, U, D] = input.split(" ").map(Number);

const visited = Array.from({ length: F + 1 }, () => false);
const queue = [];
queue.push([S, 0]);
visited[S] = true;

while (queue.length > 0) {
    let [now, count] = queue.shift();

    if (now === G) {
        console.log(count);
        // 백준환경에선 break 말고 return
        return;
    }

    const up = now + U;
    const down = now - D;
    // 위
    if (up <= F && visited[up] === false) {
        visited[up] = true;
        queue.push([up, count + 1]);
    }
    // 아래 => 수정사항: 1층까지 해야 함
    if (down >= 1 && visited[down] === false) {
        visited[down] = true;
        queue.push([down, count + 1]);
    }
}

console.log("use the stairs");
