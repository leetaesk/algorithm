/**
 * 은근 어렵네 이거 무조건 "ICN"에서 출발.
 */
function solution(tickets) {
    // tickets를 정렬하면 알파벳순 앞인 경우를 dfs가 먼저 탐색. 답 있다면 바로 리턴하는 방식
    tickets.sort();

    const used = Array.from({ length: tickets.length }, () => false);

    const dfs = (now, visitedArr) => {
        if (visitedArr.length === tickets.length + 1) {
            return visitedArr;
        }

        for (let i = 0; i < tickets.length; i++) {
            const [start, end] = tickets[i];

            if (start === now && !used[i]) {
                used[i] = true;
                const result = dfs(end, [...visitedArr, end]);
                if (result) {
                    return result;
                }
                used[i] = false;
            }
        }
    };

    return dfs("ICN", ["ICN"]);
}
