/**
 *  dp[i] = N을 i번사용해서 만들 수 있는 숫자의 집합 Set()
 */
function solution(N, number) {
    if (N === number) return 1;

    const dp = Array.from({ length: 9 }, () => new Set());

    // 1은 걍 손수 할게요
    dp[1].add(N);

    for (let i = 2; i <= 8; i++) {
        // i가 2라면 NN, i가 3이라면 NNN을 dp[i]에 추가
        dp[i].add(Number(String(N).repeat(i)));

        // dp[1]부터 dp[i-1]까지 순회하면서 덧곱나 연산
        for (let j = 1; j < i; j++) {
            // 5-55 랑 55-5 가 다르기 때문에 이런 방식으로 순회해야 함
            // dp[2]랑 dp[5]라면 각 2번씩 쓴거, 5번씩 쓴거의 숫자 조합이기 때문에
            // 55 - 55555, 55555 - 55 를 하면 N을 7번쓴 셈임
            for (const n of dp[j]) {
                for (const nn of dp[i - j]) {
                    dp[i].add(n + nn);
                    dp[i].add(n - nn);
                    dp[i].add(n * nn);
                    if (nn !== 0) dp[i].add(Math.floor(n / nn));
                }
            }
        }

        if (dp[i].has(number)) return i;
    }

    return -1;
}

console.log(solution(5, 12));
