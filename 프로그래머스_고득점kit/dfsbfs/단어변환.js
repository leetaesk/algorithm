/**
 * 일단 bfs로 보입니다. 최소거리문제
 * 갈 수 있는 조건이 :dog" "dig" 처럼 스펠링 하나 차이나는 것 => 이거 ㅅㅂ 쓸 수 있는 메서드가 있던 거 같은데? => 없음
 */
function canMove(current, next) {
    let diff = 0;
    for (let i = 0; i < current.length; i++) {
        if (current[i] !== next[i]) diff++;
        // 2개 이상 다르면 바로 false (가지치기)
        if (diff > 1) return false;
    }
    return diff === 1;
}

function solution(begin, target, words) {
    var answer = 0;

    const queue = [];
    queue.push([begin, 0]);
    const visited = Array.from({ length: words.length }, () => false);
    while (queue.length > 0) {
        const [now, count] = queue.shift();
        if (now === target) {
            return count;
        }
        for (let i = 0; i < words.length; i++) {
            const next = words[i];
            if (canMove(now, next) && visited[i] === false) {
                visited[i] = true;
                queue.push([next, count + 1]);
            }
        }
    }

    return answer;
}
/**
 * 잼민이 최적화
 */
// 두 단어가 한 글자만 다른지 확인하는 함수 (변경 없음)
function canMove(current, next) {
    let diff = 0;
    for (let i = 0; i < current.length; i++) {
        if (current[i] !== next[i]) diff++;
        // 2개 이상 다르면 바로 false 반환 (가지치기)
        if (diff > 1) return false;
    }
    return diff === 1;
}

function solution(begin, target, words) {
    // [최적화 1] 타겟 단어가 리스트에 아예 없으면 절대 도달 불가능
    // 큐를 돌리기 전에 즉시 종료하여 0.00ms로 끝냅니다.
    if (!words.includes(target)) return 0;

    const queue = [[begin, 0]];

    // [최적화 2] Visited 배열 대신 Set 자료구조 사용
    // 배열의 includes()는 O(N)이지만, Set의 has()는 O(1)이라 데이터가 많을수록 훨씬 빠릅니다.
    const visited = new Set();
    visited.add(begin);

    while (queue.length > 0) {
        const [now, count] = queue.shift();

        if (now === target) {
            return count;
        }

        for (const word of words) {
            // [최적화 3] '방문 여부'를 먼저 체크 (순서가 핵심!)
            // visited를 먼저 확인해서 이미 간 곳이라면
            // 상대적으로 연산 비용이 비싼 함수인 canMove()를 아예 실행하지 않게 합니다.
            // (이를 단락 평가, Short-circuit evaluation이라 합니다)
            if (!visited.has(word) && canMove(now, word)) {
                visited.add(word);
                queue.push([word, count + 1]);
            }
        }
    }

    return 0;
}
