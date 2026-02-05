/**
 * 왜안되노
 */
function solution(numbers, target) {
    var answer = 0;

    const dfs = (idx, value) => {
        // 끝까지 옴
        if (idx === numbers.length) {
            if (value === target) answer++;
            return;
        }

        // 여기서 인덱스오류 => dfs방식 수정
        dfs(idx + 1, value + numbers[idx + 1]);
        dfs(idx + 1, value - numbers[idx + 1]);
    };

    dfs(0, numbers[0]);
    dfs(0, -numbers[0]);

    return answer;
}
/**
 * 정답
 */
function solution(numbers, target) {
    var answer = 0;

    const dfs = (idx, value) => {
        if (idx === numbers.length) {
            if (value === target) answer++;
            return;
        }

        dfs(idx + 1, value + numbers[idx]);
        dfs(idx + 1, value - numbers[idx]);
    };

    dfs(0, 0);

    return answer;
}
