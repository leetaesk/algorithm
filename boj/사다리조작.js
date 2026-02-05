const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
/**
 * 역량이 안되서 못품;;
 * 역량이 안되서 못품;;
 * 역량이 안되서 못품;;
 * 역량이 안되서 못품;;
 * 역량이 안되서 못품;;
 * 역량이 안되서 못품;;
 * 역량이 안되서 못품;;
 * 역량이 안되서 못품;;
 * 역량이 안되서 못품;;
 * 역량이 안되서 못품;;
 * 역량이 안되서 못품;;
 * 역량이 안되서 못품;;
 * 역량이 안되서 못품;;
 * 역량이 안되서 못품;;
 * 역량이 안되서 못품;;
 * 역량이 안되서 못품;;
 * 역량이 안되서 못품;;
 * 역량이 안되서 못품;;
 * 역량이 안되서 못품;;
 * 역량이 안되서 못품;;
 * 역량이 안되서 못품;;
 * 역량이 안되서 못품;;
 * 역량이 안되서 못품;;
 * 역량이 안되서 못품;;
 * 역량이 안되서 못품;;
 * 역량이 안되서 못품;;
 * 역량이 안되서 못품;;
 */
const input = `5 5 6
1 1
3 2
2 3
5 1
5 4`
    .toString()
    .trim()
    .split("\n");

// 정답이 3보다 크거나 불가능하다면 -1을 출력한다??
// 10 x 30 은 300... 300개 중 3개를 고르는 개수는 50*299*298 / **1 대충 90,000 * 50 = 4,500,000
// 사백오십만 경우마다 최대 10개 시뮬레이션 =>
const [N, M, H] = input[0].split(" ").map(Number);
const bridges = input.slice(1).map((s) => s.split(" ").map(Number));

if (M === 0 || M === 1) {
    console.log(M);
    return;
}

const getCombination = (arr, selectNum) => {
    const results = [];
    if (selectNum === 1) return arr.map((el) => [el]);

    arr.forEach((fixed, index, origin) => {
        const rest = arr.slice(index + 1);
        const combinations = getCombination(rest, selectNum - 1);
        const attached = combinations.map((comb) => [fixed, ...comb]);
        results.push(...attached);
    });

    return results;
};
