// const fs = require('fs')
// const N = Number(fs.readFileSync('/dev/stdin').toString().trim())

const N = 27;

const arr = ["*"];

const memo = Array.from({ length: 9 }, () => null);

const makeStar = (k) => {
    if (memo[k]) return memo[k];
    if (k === 1) return `*`;

    const block = makeStar(k - 1);

    // 줄바꿈으로 그거
    const blockArr = block.split("\n");
    const topBottomStick = blockArr.map((str) => str.repeat(3)).join("\n");
    const middleStick = blockArr
        .map((str) => str + " ".repeat(str.length) + str)
        .join("\n");

    if (!memo[k])
        memo[k] = topBottomStick + "\n" + middleStick + "\n" + topBottomStick;
    return topBottomStick + "\n" + middleStick + "\n" + topBottomStick;
};

const k = Math.round(Math.log(N) / Math.log(3)) + 1;
console.log(makeStar(k));

/**
 * 제미나이 최적화 ㄱㄱ
 */
// const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim();
// const N = 27; // 테스트용

// 메모이제이션: key를 N 크기 자체로 사용하거나, 지수(k)로 사용 가능
// 여기서는 N을 직접 사용하되, 배열 등을 저장하지 않고 로직 단순화에 집중한 버전입니다.
// N이 2187(3^7) 정도로 크지 않다면 굳이 메모이제이션 없이도 배열 합치기 방식이 매우 빠릅니다.

const makeStarLines = (n) => {
    // Base Case: n이 1이면 별 하나가 담긴 배열 반환
    if (n === 1) return ["*"];

    // 재귀 호출: n/3 크기의 패턴(배열)을 가져옴
    const smallerBlock = makeStarLines(n / 3);

    // 상단/하단: 작은 블록을 가로로 3번 반복
    const topBottom = smallerBlock.map((line) => line.repeat(3));

    // 중단: 작은 블록 + 공백 + 작은 블록
    const middle = smallerBlock.map((line) => line + " ".repeat(n / 3) + line);

    // 배열 전개 연산자로 합쳐서 반환 (문자열 join은 아직 안 함)
    return [...topBottom, ...middle, ...topBottom];
};

// 마지막에 한 번만 join
console.log(makeStarLines(N).join("\n"));
