/**
 * 쉬운문제지만 꽤 많이 틀린 듯 ㅋ;;
 * isPrime에서 1빼는거까먹음. isPrime은 테라토스테네스의 채로 업글 가능 근데 걍 저렇게 썼음
 * set에 "숫자" 문자열을 넣을 떄 "11"과 "011은" 같은 숫자임!
 * 이걸 values()로 뽑고 map(NUmber)해버리면 11이 두개 생겨서
 * 넣을 때 숫자로 변환해서 넣는 게 포인트!
 */
const isPrime = (value) => {
    // 1은 소수가 아니므로 예외 처리 (0, 음수 포함)
    if (value < 2) return false;
    for (let i = 2; i <= Math.sqrt(value); i++) {
        if (value % i === 0) return false;
    }
    return true;
};

function solution(numbers) {
    // 중복방지
    const set = new Set();
    const arr = numbers.split("");
    const visited = Array.from({ length: arr.length }, () => false);

    const dfs = (a, idx) => {
        set.add(Number(a));
        arr.forEach((_, i) => {
            if (visited[i] === false) {
                visited[i] = true;
                dfs(a + arr[i], i);
                visited[i] = false;
            }
        });
    };

    arr.forEach((a, idx) => {
        visited[idx] = true;
        dfs(a, idx);
        visited[idx] = false;
    });

    return [...set.values()].map(Number).filter((i) => isPrime(i)).length;
}
