/**
 * [문제 해결 로직]
 * 1. 문자열 계산은 복잡하므로 모든 문자열을 '숫자(26진수)'로 변환합니다.
 * 2. 제외해야 할 단어(bans)들을 숫자로 바꾸고 오름차순으로 정렬합니다.
 * 3. 목표 순위(n)를 잡고, 내 앞에 금지된 숫자가 있는지 확인하며 뒤로 한 칸씩 밀어냅니다.
 */

function solution(n, bans) {
    // [변환 함수 1] 문자열 -> 숫자
    // 예: 'a' -> 1, 'z' -> 26, 'aa' -> 27
    const wordToNumber = (word) => {
        let result = 0;
        for (let i = 0; i < word.length; i++) {
            // 앞자리 숫자에 26을 곱해 자릿수를 올리고, 현재 글자의 값을 더함
            // 'a'의 아스키코드는 97. 여기서 96을 빼면 1이 됨.
            // 26진수니까 26을 곱하는 게 한칸추가하는 거라고 해석하면 될 듯?
            // a -> 1이 나옴
            // 다음 반복문 ->
            result = result * 26 + (word.charCodeAt(i) - 96);
        }
        return result;
    };

    // [변환 함수 2] 숫자 -> 문자열
    // 계산이 끝난 최종 숫자를 다시 정답 형식으로 바꿈
    const numberToWord = (number) => {
        let str = "";
        while (number > 0) {
            number--; // 1부터 시작하는 인덱스를 0부터 시작하도록 보정 (나머지 연산 위해)

            // 26으로 나눈 나머지로 현재 자리의 알파벳을 구함 (0 -> a, ... 25 -> z)
            str = String.fromCharCode(97 + (number % 26)) + str;

            // 다음 자릿수로 넘어감
            number = Math.floor(number / 26);
        }
        return str;
    };

    // 1. 금지된 단어(bans)들을 전부 숫자로 변환하고, 작은 숫자부터 순서대로 정렬
    const bannedNumbers = bans.map(wordToNumber).sort((a, b) => a - b);

    // 2. 일단 우리가 찾는 목표 순위(n)를 임시 정답(ans)으로 설정
    let ans = n;

    // 3. 금지된 숫자들을 하나씩 확인하면서 내 위치(ans)를 조정
    for (const bannedNum of bannedNumbers) {
        // 만약 금지된 숫자가 '내 현재 위치'보다 작거나 같다면?
        // -> 내 앞(혹은 내 자리)에 못 쓰는 숫자가 있다는 뜻!
        if (bannedNum <= ans) {
            ans++; // 자리를 양보하고 한 칸 뒤로 이동
        } else {
            // 금지된 숫자가 '내 현재 위치'보다 크다면?
            // -> 내 뒤에 있는 애들이니 내 등수에 영향을 안 줌. 더 볼 필요 없음.
            break;
        }
    }

    // 4. 최종 확정된 순위를 다시 문자열로 바꿔서 반환
    return numberToWord(ans);
}

// 테스트 실행
console.log(
    solution(7388, [
        "gqk",
        "kdn",
        "jxj",
        "jxi",
        "fug",
        "jxg",
        "ewq",
        "len",
        "bhc",
    ])
);
