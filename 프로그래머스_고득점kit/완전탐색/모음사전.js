/**
 * 아예 못 풀음 ㅋㅋ 병신같은새끼 진짜
 * 첫번쨰 풀이 => 걍 사전만들어서 indexOf하기 => 로직이 어렵진 않음
 */
function getAllWords() {
    const vowels = ["A", "E", "I", "O", "U"];
    const result = [];

    const dfs = (currentWord) => {
        // 길이가 5를 넘어가면 더 붙이지 않고 종료
        if (currentWord.length > 5) return;

        // 빈 문자열이 아니면 결과에 추가
        if (currentWord.length > 0) {
            result.push(currentWord);
        }

        // A, E, I, O, U 순서대로 붙여서 재귀 호출
        for (let i = 0; i < vowels.length; i++) {
            dfs(currentWord + vowels[i]);
        }
    };

    dfs("");
    return result;
}

function solution(word) {
    const dictionary = getAllWords();
    return dictionary.indexOf(word) + 1;
}
/**
 * 두번쨰풀이 => 약간 수학적으로.... 이건 이해 잘 안됨
 */
function solution(word) {
    // 1. 각 자릿수별 가중치 (등비수열의 합)
    // [5^4+..+1, 5^3+..+1, 5^2+..+1, 5^1+1, 1]
    const weights = [781, 156, 31, 6, 1];

    // 2. 모음의 인덱스 매핑
    const vowels = { A: 0, E: 1, I: 2, O: 3, U: 4 };

    let answer = 0;

    // 3. 입력받은 단어를 순회하며 계산
    for (let i = 0; i < word.length; i++) {
        const char = word[i];

        // (해당 문자의 순서 * 자릿수 가중치) + 1
        // +1을 하는 이유는, 자릿수 자체가 존재함으로써 카운트가 1 올라가기 때문입니다.
        // 예: 'A'는 0*781 + 1 = 1번째
        // 예: 'E'는 1*781 + 1 = 782번째
        answer += vowels[char] * weights[i] + 1;
    }

    return answer;
}
