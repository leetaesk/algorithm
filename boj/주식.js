/**
 * 주식
 * 그냥 처음 든 생각대로 뒤에 순회하면서 가장 높은 날에 파는 게 좋아보입니다. 파는 날 다음날부터 다시 반복하는걸로 ㄱㄱ
 * 뒤에서부터 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * 로직정리
 * 맨뒤에서부터 순회
 * '지금까지 중 최댓값'을 memo할거임, 초기값은 0
 * 초기값보다 높다면 memo를 갱신하고 다음(그 앞으로)
 * 초기값보다 낮다면 이익계산
 * [2,3,4,1,2,3]
 * memo=3, 다음
 * 2가 3보다 작음. 1추가
 * 1이 3보다 작음. 2추가
 * 4가 memo보다 큼. 갱신 후 다음
 * 3이 4보다 작음. 1추가
 * 2가 4보다 작음. 1추가
 * 만약 1,2,3,1,2,3이였다면?
 * memo가 같다면 갱신 후 다음로직이 똑같음. 이익계산시에도 0으로 되서 로직상 오류가 없는 듯
 * 직관적으로 하고 싶다면 if(now >= memo) 갱신
 * 이렇게 하는게 생각할 떄 좀 직관적인 듯
 */
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const input = `3
3
10 7 6
3
3 5 9
5
1 1 3 1 2`
    .trim()
    .split("\n");

const T = Number(input[0]);
let line = 1;

const testCases = [];
for (let i = 0; i < T; i++) {
    const N = Number(input[line]);

    const prices = input[line + 1].split(" ").map(Number);
    testCases.push({ N, prices });
    line += 2;
}

for (let testCase of testCases) {
    const { N, prices } = testCase;

    let benefit = 0;
    let memo = 0;

    for (let i = N - 1; i >= 0; i--) {
        let today = prices[i];

        // 오늘이 최고점이라면 갱신하고 점프
        if (today > memo) {
            memo = today;
            continue;
        }

        // 최고점이 아니라면 benefit에 추가
        benefit += memo - today;
    }

    console.log(benefit);
}

/**
 * 시간초과. console.log만바로바로하게 바꿔보기 => 되겠냐
 */
