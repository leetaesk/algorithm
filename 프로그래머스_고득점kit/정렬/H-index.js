/**
 * 내 코드
 */
function solution(citations) {
    const max = Math.max(...citations);
    for (let h = max; h > 0; h--) {
        let count = 0;
        citations.forEach((c) => {
            if (c >= h) count++;
        });
        if (count >= h) return h;
    }
    return 0;
}
/**
 * 통과는 했지만...
 * 최적화 방안 => 내림차순 정렬 후 h보다 작아졌을 때 stop!!
 */
function solution(citations) {
    // 1. 인용 횟수를 내림차순으로 정렬합니다.
    citations.sort((a, b) => b - a);

    // 2. h번 이상 인용된 논문이 h편 이상인지 확인합니다.
    let h = 0;
    while (h < citations.length && citations[h] >= h + 1) {
        h++;
    }

    return h;
}
