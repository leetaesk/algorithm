// const N = Number(require("fs").readFileSync("/dev/stdin").toString().trim());

const N = 18;

const solution = () => {
    // 감소하는 수의 최대값은 9876543210이며, 이는 1022번째 인덱스입니다.
    // N이 1022보다 크면 감소하는 수를 만들 수 없습니다.
    if (N > 1022) return -1;

    const list = [];

    // 1. 한 자릿수(0~9)를 먼저 리스트에 넣습니다.
    for (let i = 0; i <= 9; i++) {
        list.push(i);
    }

    // 2. 리스트(큐)를 순회하면서 뒤에 작은 숫자를 붙여나갑니다.
    // 별도의 큐 관리 없이, list에 계속 push하고 인덱스(idx)로 접근하면 큐처럼 동작합니다.
    let idx = 0;
    while (idx < list.length) {
        const currentNum = list[idx];
        const lastDigit = currentNum % 10; // 현재 숫자의 마지막 자릿수

        // 마지막 자릿수보다 작은 숫자들을 뒤에 붙여서 새로운 감소하는 수를 만듭니다.
        // 예: currentNum이 3이면 -> 30, 31, 32 생성
        for (let i = 0; i < lastDigit; i++) {
            const nextNum = currentNum * 10 + i;
            list.push(nextNum);
        }

        idx++;
    }

    // N번째 감소하는 수를 반환합니다.
    // BFS 특성상(작은 수부터 생성, 0부터 차례로 붙임) 자연스럽게 정렬된 상태가 됩니다.
    return list[N];
};

console.log(solution());
