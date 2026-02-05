/**
 * 그리디 ? now기록하고 현재값이랑 비교하면서 진행
 * let before, now, leng ?
 */
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const input = `6 2
3 2 1 1 2 3
3 2 2 1 2 3
3 2 2 2 3 3
3 3 3 3 3 3
3 3 3 3 2 2
3 3 3 3 2 2`
    .trim()
    .split("\n");

const [N, L] = input[0].split(" ").map(Number);
const map = input.slice(1).map((i) => i.split(" ").map(Number));

let answer = 0;

function check(line) {
    const visited = new Array(N).fill(false); // 경사로 설치 여부

    for (let i = 0; i < N - 1; i++) {
        const diff = line[i] - line[i + 1]; // 현재칸 - 다음칸

        // 1. 높이가 같으면 패스
        if (diff === 0) continue;

        // 2. 높이 차이가 1보다 크면 불가능
        if (Math.abs(diff) > 1) return false;

        // 3. 오르막길 (다음 칸이 1 더 높음: diff === -1)
        if (diff === -1) {
            // 현재 칸(i) 포함 뒤로 L칸 검사
            for (let j = 0; j < L; j++) {
                if (i - j < 0 || visited[i - j] || line[i] !== line[i - j])
                    return false;
                visited[i - j] = true;
            }
        }
        // 4. 내리막길 (다음 칸이 1 더 낮음: diff === 1)
        else if (diff === 1) {
            // 다음 칸(i+1) 포함 앞으로 L칸 검사
            for (let j = 1; j <= L; j++) {
                if (i + j >= N || visited[i + j] || line[i + 1] !== line[i + j])
                    return false;
                visited[i + j] = true;
            }
        }
    }
    return true;
}

// 가로 검사
for (let i = 0; i < N; i++) {
    if (check(map[i])) answer++;
}

// 세로 검사 (열을 배열로 만들어서 check 함수 재사용)
for (let i = 0; i < N; i++) {
    const column = [];
    for (let j = 0; j < N; j++) column.push(map[j][i]);
    if (check(column)) answer++;
}

console.log(answer);
