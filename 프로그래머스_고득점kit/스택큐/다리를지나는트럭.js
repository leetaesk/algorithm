/**
 * 딱봐도큐인거같죠
 */
function solution(bridge_length, weight, truck_weights) {
    const queue = [];
    // 그냥 count 하나씩 증가시키면서 다 지났으면 return해도 될 듯
    // 최적화 가능성 보이나 (시간점프) 일단 위처럼 진행 ㄱㄱ
    let count = 0;
    let weightOnBridge = 0;
    while (queue.length > 0 || truck_weights.length > 0) {
        count++;
        //맨 앞에꺼 나가야 되면 stack에서 제거 => 큐네 지금보니까
        if (queue.length > 0 && queue[0].outTime === count) {
            weightOnBridge -= queue[0].weight;
            queue.shift();
        }

        //더 올릴 수 있으면
        if (
            truck_weights.length > 0 &&
            weightOnBridge + truck_weights[0] <= weight
        ) {
            // now+bridge_length === 나가는 시간을 queue에 담음
            let now = truck_weights.shift();
            queue.push({ weight: now, outTime: count + bridge_length });
            weightOnBridge += now;
        }
    }
    return count;
}
/**
 * 최적화 => count를 하나씩 증가시키지 않고 맨 앞 트럭이 나가는 시간으로 점프하면 최적화가능
 */
function solution(bridge_length, weight, truck_weights) {
    const queue = [];
    let count = 0;
    let weightOnBridge = 0;

    // 대기 트럭이 있거나 다리 위에 트럭이 있는 동안 반복
    while (truck_weights.length > 0 || queue.length > 0) {
        // 1. [기존 로직 유지] 다리를 다 건넌 트럭 처리
        if (queue.length > 0 && queue[0].outTime === count) {
            weightOnBridge -= queue[0].weight;
            queue.shift();
        }

        // 2. 다음 트럭을 올릴 수 있는지 확인
        if (truck_weights.length > 0) {
            if (weightOnBridge + truck_weights[0] <= weight) {
                // [올릴 수 있음] 1초 흐르고 트럭 진입
                count++;
                const now = truck_weights.shift();
                weightOnBridge += now;
                queue.push({ weight: now, outTime: count + bridge_length });
            } else {
                // [올릴 수 없음 - 최적화 포인트]
                // 1초씩 기다리는 게 아니라, 맨 앞 트럭이 나가는 시간으로 점프!
                if (queue.length > 0) {
                    count = queue[0].outTime;

                    // 점프했으니 해당 시간에 나가는 트럭 바로 처리
                    weightOnBridge -= queue[0].weight;
                    queue.shift();
                }
            }
        } else {
            // [대기 트럭 없음] 남은 트럭들이 다 지나갈 때까지 한 번에 점프
            // 마지막 트럭이 나가는 시간으로 count 갱신하고 종료
            count = queue[queue.length - 1].outTime;
            break;
        }
    }

    return count;
}
