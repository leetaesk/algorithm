function solution(arr) {
    // 숫자 갯수
    const N = Math.ceil(arr.length / 2);

    // 최대힙, 최소힙을 정의
    // maxDp[i][j] === i부터j까지의 최대값!
    const maxDp = Array.from({ length: N }, () =>
        Array.from({ length: N }, () => -Infinity),
    );
    const minDp = Array.from({ length: N }, () =>
        Array.from({ length: N }, () => Infinity),
    );

    // 자기자신세팅
    for (let i = 0; i < N; i++) {
        // 형변환필수
        const num = Number(arr[i * 2]);
        maxDp[i][i] = num;
        minDp[i][i] = num;
    }

    // 구간, i별로 반복
    for (let leng = 1; leng < N; leng++) {
        // 시작인덱스
        for (let left = 0; left < N - leng; left++) {
            // 끝
            let right = left + leng;

            // k === left와right를 나누는기준점
            for (let k = left; k < right; k++) {
                const 연산자 = arr[k * 2 + 1];

                if (연산자 === "+") {
                    maxDp[left][right] = Math.max(
                        maxDp[left][right],
                        // left~k, k+1부터임에 주의
                        maxDp[left][k] + maxDp[k + 1][right],
                    );
                    minDp[left][right] = Math.min(
                        minDp[left][right],
                        minDp[left][k] + minDp[k + 1][right],
                    );
                } else {
                    // 뺄셈: (최대 - 최소)가 최대, (최소 - 최대)가 최소
                    maxDp[left][right] = Math.max(
                        maxDp[left][right],
                        maxDp[left][k] - minDp[k + 1][right],
                    );
                    minDp[left][right] = Math.min(
                        minDp[left][right],
                        minDp[left][k] - maxDp[k + 1][right],
                    );
                }
            }
        }
    }

    return maxDp[0][N - 1];
}

console.log(solution(["5", "-", "3", "+", "1", "+", "2", "-", "4"]));
