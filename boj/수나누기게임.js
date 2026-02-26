const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = `3
3 4 12`
    .toString()
    .trim()
    .split("\n");

const N = Number(input[0]);

// memoIdx[i] == input에서 준 자료의 인덱스를 넣어둠
const memoIdx = Array.from({ length: 1000001 }, () => null);
const arr = input[1].split(" ").map(Number);
arr.forEach((num, idx) => {
    memoIdx[num] = idx;
});

// 내림차순 정렬 => 필요하냐? ㄴㄴ 필없
// arr 순회하면서 약수들은 ++. 약수들의 개수만큼 --
const get약수 = (n) => {
    const results = [];
    /**
     * 1부터 시작해야지 빙신아
     */
    for (let i = 1; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            results.push(i);
            if (i * i !== n) {
                results.push(n / i);
            }
        }
    }
    return results;
};

console.log(get약수(12));

const answer = Array.from({ length: N }, () => 0);

for (let i = 0; i < N; i++) {
    // 3,4,12
    const num = arr[i];
    // 3,4,12의 약수들배열
    const 약수들 = get약수(num);

    for (let 약수 of 약수들) {
        // 약수가 arr 안에 들어있다면
        if (memoIdx[약수] !== null) {
            answer[i]--;
            answer[memoIdx[약수]]++;
        }
    }
}

console.log(answer.join(" "));
