/**
 * 내 생각엔 안입는경우까지 전부를 고려해서 경우의 수를 구하고
 * '다 안 입은 경우' 1을 빼면 답 나오지 않나?
 */
// 내 풀이
function solution(clothes) {
    let answer = 1;
    const map = new Map();
    for (let [clothe, category] of clothes) {
        const currentList = map.get(category) || [];
        map.set(category, [...currentList, clothe]);
    }
    for (let clothesListByCategory of [...map.values()]) {
        // 안 입는 경우 +1
        let count = clothesListByCategory.length + 1;
        // answer에 곱함
        answer *= count;
    }
    // 다 안 입는 경우 한가지 빼기
    return answer - 1;
}
/**
 * 최적화 - 메모리 덜 사용하기. iterator를 반복문에서 그대로 사용
 */
function solution(clothes) {
    let answer = 1;
    const map = new Map();

    // 1. 이름은 버리고( _ ), 카테고리별 개수만 카운트
    for (let [_, category] of clothes) {
        map.set(category, (map.get(category) || 0) + 1);
    }

    // 2. (개수 + 1)을 모두 곱함
    for (let count of map.values()) {
        answer *= count + 1;
    }

    return answer - 1;
}
