const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = `3
9
2 1 4 3 5 6 2 7 2`
    .toString()
    .trim()
    .split("\n");

const N = Number(input[0]);
const leng = Number(input[1]);
const likes = input[2].split(" ").map(Number);

// photo = [학생번호, 게시된 시점], photos의 최대길이는 N
let photos = [];
// 학생 추천수를 별도의 배열로 관리. 초기값 0
let students = Array.from({ length: 101 }, () => 0);

for (let i = 0; i < leng; i++) {
    // 지금 추천받은 학생번호
    const student = likes[i];

    // 추천받은 학생이 이미 추천을 받아서 게시가 되어있다
    if (students[student] > 0) {
        students[student] += 1;
        continue;
    }

    // 아닐 때. photos에 자리가 남아있다면 넣는다
    if (photos.length < N) {
        // [학생번호, 게시시점]
        photos.push([student, i]);
        students[student] += 1;
        continue;
    }

    // 자리가 없을 때. 추천수가 낮고 오래된 순으로 정렬 후 pop하고 push하기
    photos.sort((a, b) => {
        // 1순위: 추천수 비교 (students 배열의 값 참조)
        // 추천수가 많은은 순(내림차순)
        if (students[a[0]] !== students[b[0]]) {
            return students[b[0]] - students[a[0]];
        }

        // 2순위: 게시된 시점 비교
        // 시점 높은 순 => 오름차순
        return b[1] - a[1];
    });

    let [사라진놈번호, _] = photos.pop();
    students[사라진놈번호] = 0;
    photos.push([student, i]);
    students[student] += 1;
}

console.log(
    photos
        .map((s) => {
            return s[0];
        })
        .sort((a, b) => a - b)
        .join(" "),
);
