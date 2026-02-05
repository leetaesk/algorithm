/**
 * 전화번호목록
 * 전화번호 여러개를 주고 전화번호 중 접두어가 있는지 찾는 문제
 * 해결방법 1 - sort와 노가다 (sort메서드를 이용한 편법)
 * phone_book은 "숫자"라서 sort로 정렬이 가능하다.
 * phone_book을 순회하면서 i+1~length-1 까지중 startWith(phone)이면 접두어 발견이라는 것.
 */
function solution(phone_book) {
    // phone_book을 정렬
    phone_book.sort();

    // phone_book을 순회하면서 뒤에있는 것중에 찾아보기
    for (let i = 0; i < phone_book.length; i++) {
        let phone = phone_book[i];
        for (let j = i + 1; j < phone_book.length; j++) {
            // 접두어인 경우 false 반환
            if (phone_book[j].startsWith(phone)) {
                return false;
            }
            // 시간초과 => 탈출문으로 아껴보기
            if (phone_book[j][0] !== phone[0]) break;
        }
    }

    // 접두어 없으면 true 반환
    return true;
}
// 시간초과남 ㅅㄱ ㅋㅋ

/**
 * 방법2
 * map과 has메서드 사용
 */

function solution(phone_book) {
    const map = new Map();
    // map은 원래 key랑 value가 들어가는 앤데... key만쓸거라 value엔 아무 값이나 넣어도 노알라
    phone_book.forEach((phone) => map.set(phone, true));

    // phone_book순회하면서 맵에 있는지 찾아보기 => map탐색시간은 1이라 O(n*m) m은 문자열의 길이
    for (const phone of phone_book) {
        //글자 잘라가면서 맵에 있는지 확인 = 자신의 접두어가 있는지 확인하는 방법
        for (let i = 1; i < phone.length; i++) {
            const slicedPhone = phone.slice(0, i);
            if (map.has(slicedPhone)) return false;
        }
    }

    return true;
}
