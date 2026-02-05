/**
 * 참 ㅈ같은 문제
 */
function solution(prices) {
    const answer = [];

    // 마지막 거 바로 전까지만 돌리고
    for (let i = 0; i < prices.length - 1; i++) {
        let time = 0;

        // 내 다음부터 끝까지 봄
        for (let j = i + 1; j < prices.length; j++) {
            // 일단 1초 흐름 (떨어지든 말든 1초는 버틴 거임)
            time++;

            // 가격이 떨어졌으면 그만 세고 탈출
            if (prices[i] > prices[j]) {
                break;
            }
        }
        answer.push(time);
    }

    // 마지막은 항상 0
    answer.push(0);
    return answer;
}
