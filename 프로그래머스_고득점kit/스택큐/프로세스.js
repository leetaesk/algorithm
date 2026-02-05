/**
 * 1. 실행 대기 큐(Queue)에서 대기중인 프로세스 하나를 꺼냅니다.
 * 2. 큐에 대기중인 프로세스 중 우선순위가 더 높은 프로세스가 있다면 방금 꺼낸 프로세스를 다시 큐에 넣습니다.
 * 3. 만약 그런 프로세스가 없다면 방금 꺼낸 프로세스를 실행합니다.
 *   3.1 한 번 실행한 프로세스는 다시 큐에 넣지 않고 그대로 종료됩니다
 * 그냥 시키는 대로 구현 한 번 해볼까요
 */
function solution(priorities, location) {
    let count = 0;
    const queue = [];
    priorities.forEach((i, idx) => {
        // queue데이터 가공 => 우선순위, 위치로 가공
        queue.push({ priority: i, index: idx });
    });
    // 루프 시작
    while (queue.length > 0) {
        // 1. 대기중인거 꺼냄
        const now = queue.shift();
        // 2. 대기중인 프로세스 중 우선순위가 더 높은 게 있다면 큐에 다시 넣기
        // 여기서 includes썼다가 some으로 바꿈 => includes는 값만 비교함(콜백을 못받음 병신임)
        // 뒷이야기 => 오히려 includes가 최신문법 (무려es7) 이다 !
        // 원래 includes없을때는 indexOf써서 -1 나온다 =>> 없다. 이런 로직을 썼음...
        // !== -1 이거 치기 귀찮다! 해서 나온 게 includes임 신기방기 some은 es5로 근본있는 놈임
        if (queue.some((i) => i.priority > now.priority)) {
            queue.push(now);
        } else {
            // 3.4. 없다면 그대로 날리는 건데
            count++;
            // 날리는 거의 index가 location이면 몇번째 실행인지 답
            if (now.index === location) {
                return count;
            }
        }
    }
}
