/**
 * 내전략 => 아파트배열을만들고 1부터 순회
 * 전파가 안 닿는 곳 발견 (가장 앞일 거임) => 연결되어 있는 미전파구역의 개수를 구한다
 * 연결되어있는 미전파구역 / w*2+1 를 Math.ceil()하면 필요한 기지국 개수
 * 다음 순회
 * 효율성 탈락 => 기지국 설치 후 다음까지 점프로직 추가하기
 * 이거 아니네 에러메시지 : 실패 (signal: aborted (core dumped)) => 메모리초과인듯?
 * map을 굳이 안 만들어도 되는 거 아닌가? stations에 범위안이라면 추가해버리기 ??? => ㄴㄴ 걍 음... stations를 순회하는 게 좋을 거 같은데?
 * 잘했는데 memoRight 갱신이 틀렸네 ㅜㅜ 개까빙 시발
 */
function solution(n, stations, w) {
    let answer = 0;

    // 기지국 하나의 범위, 계산용
    const range = w * 2 + 1;

    // 힌트: stations는 오름차순 정렬되어있음
    let memoRight = 0;
    for (let i = 0; i < stations.length; i++) {
        // 기지국, 범위왼쪽끝점, 범위오른쪽 끝점
        let now = stations[i];
        let left = now - w;
        let right = now + w;

        // left - memoRight 가 1보다 크다면 => 1차이면 미설치구역 없는거임
        if (left - memoRight > 1) {
            // 미설치구역의 개수 count, left가 3이고 memoRight 1이라면 미설치구역 1
            const unInstalled = left - memoRight - 1;
            // 필요한 개수 추가
            answer += Math.ceil(unInstalled / range);
        }

        // memoRight 업데이트
        // 2. 전파 범위 갱신 (🚨 핵심 수정: if문 밖에서, 항상 최댓값으로 갱신)
        if (right > memoRight) {
            memoRight = right;
        }
    }

    // 맨 마지막 오른쪽 직접 카운트
    const mostRight = stations[stations.length - 1] + w;
    // 아파트 13까지. 가장오른쪽 12라면 1차이나도 색칠해야 함
    if (n - mostRight >= 1) {
        const unInstalled = n - mostRight;
        answer += Math.ceil(unInstalled / range);
    }

    return answer;
}

console.log(solution(16, [9], 2));
