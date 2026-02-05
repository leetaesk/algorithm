/**
 * 이건 기억이 나네요
 * 2차원으로 안해도 갱신하는 방식으로 하면 메모리아낄 수 있던 거 같음 바로 그렇게 해봄 걍
 */
function solution(triangle) {
    const n = triangle[triangle.length - 1].length;

    const dp = Array.from({ length: n }, () => 0);

    dp[0] = triangle[0][0];

    for (let i = 1; i < n; i++) {
        // dp를 덮어씌울 arr복사 => 최댓값이 적용되어있는 윗층임 [10,15, 0, 0,...]
        const arr = dp.slice();
        // 비교하고 있는 현재층 배열임 [8,1,0]
        const now = triangle[i];

        for (let idx = 0; idx < now.length; idx++) {
            if (idx === 0) arr[0] = dp[0] + now[0];
            else if (idx === now.length - 1) arr[idx] = dp[idx - 1] + now[idx];
            else {
                arr[idx] = Math.max(dp[idx - 1] + now[idx], dp[idx] + now[idx]);
            }
        }

        arr.forEach((num, idx) => {
            dp[idx] = num;
        });
    }

    return Math.max(...dp);
}

console.log(solution([[7], [3, 8], [8, 1, 0], [2, 7, 4, 4], [4, 5, 2, 6, 5]]));
/**
 * 최적화
 */
function solution(triangle) {
    const n = triangle.length;
    // 1. DP 배열 초기화 (맨 꼭대기 값)
    const dp = Array(n).fill(0);
    dp[0] = triangle[0][0];

    for (let i = 1; i < n; i++) {
        // ★ 핵심: 뒤에서부터 앞으로 루프 (j--)
        // 이렇게 하면 dp[j-1]이 아직 갱신 전(윗층) 값이므로 안전하게 참조 가능
        for (let j = i; j >= 0; j--) {
            if (j === 0) {
                // 맨 왼쪽: 바로 위에서 내려옴
                dp[j] = dp[j] + triangle[i][j];
            } else if (j === i) {
                // 맨 오른쪽: 왼쪽 위에서 내려옴
                dp[j] = dp[j - 1] + triangle[i][j];
            } else {
                // 중간: 왼쪽 위(dp[j-1])와 바로 위(dp[j]) 중 큰 값 선택
                dp[j] = Math.max(dp[j - 1], dp[j]) + triangle[i][j];
            }
        }
    }

    return Math.max(...dp);
}
/**
 * 신의 풀이법 => 걍 거꾸로 올라가셈 ;;
 */
function solution(triangle) {
    // 밑바닥 바로 윗 층부터 시작해서 꼭대기까지 올라감
    for (let i = triangle.length - 2; i >= 0; i--) {
        for (let j = 0; j < triangle[i].length; j++) {
            // 내 아래 두 녀석 중 큰 놈을 나한테 더함
            triangle[i][j] += Math.max(
                triangle[i + 1][j],
                triangle[i + 1][j + 1]
            );
        }
    }
    // 꼭대기에 모든 최댓값이 누적됨
    return triangle[0][0];
}
