/**
 * 처음 내풀이
 */
function solution(numbers) {
    return numbers.map(String).sort().reverse().join("");
}
/**
 * 오답임 ㅜㅜ 맞는 풀이
 */
function solution(numbers) {
    const answer = numbers
        .map(String)
        .sort((a, b) => b + a - (a + b)) // 이 정렬 로직이 핵심입니다. 형변환해서 숫자로 연산됨 ㅋ
        // 문자열로 비교한다면?
        // (b + a)가 (a + b)보다 크면(뒤에 있으면) 양수가 나옴 -> b를 앞으로 보냄
        // .sort((a, b) => (b + a).localeCompare(a + b))
        .join("");

    return answer[0] === "0" ? "0" : answer;
}
