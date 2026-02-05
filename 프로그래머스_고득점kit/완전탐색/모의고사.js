/**
 * 풀긴했는데
 * count에서 최댓값 뽑는 형식이 맘에 안 듦! 최적화 어떻게 할까요?
 */
function solution(answers) {
    // 최대 10000문제 => 걍 repeat쓸까 ㅋㅋ
    let count = [0, 0, 0];
    const first = [1, 2, 3, 4, 5];
    const second = [2, 1, 2, 3, 2, 4, 2, 5];
    const third = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

    answers.forEach((answer, idx) => {
        if (answer === first[idx % 5]) count[0]++;
        if (answer === second[idx % 8]) count[1]++;
        if (answer === third[idx % 10]) count[2]++;
    });

    const returnValue = [];
    const most = Math.max(...count);
    count.forEach((c, idx) => {
        if (c === most) returnValue.push(idx + 1);
    });
    return returnValue;
}
/**
 * 잼민이 최적화
 */
function solution(answers) {
    const count = [0, 0, 0];
    const patterns = [
        [1, 2, 3, 4, 5],
        [2, 1, 2, 3, 2, 4, 2, 5],
        [3, 3, 1, 1, 2, 2, 4, 4, 5, 5],
    ];

    // 점수 채점 (이 부분은 로직이 같지만, patterns 배열로 묶어서 2중 루프로 돌리면 확장이 쉽습니다)
    answers.forEach((answer, i) => {
        patterns.forEach((pattern, pIdx) => {
            if (answer === pattern[i % pattern.length]) count[pIdx]++;
        });
    });

    // 여기가 핵심! (최댓값 뽑기 리팩토링)
    const max = Math.max(...count);

    // "1, 2, 3번 사람 중에서(배열), count의 [i]번째 값이 max와 같은 사람만 남겨라"
    return [1, 2, 3].filter((_, i) => count[i] === max);
}
