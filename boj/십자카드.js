const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `2 1 1 2`.toString().trim();

const rotate = (str) => {
    return str.slice(1) + str[0];
};

// N을 문자열 그대로
let inputN = input.split(" ").join("");

let N = inputN;

for (let i = 1; i <= 3; i++) {
    inputN = rotate(N);
    N = String(Math.min(+N, +inputN));
}

let numStr = "1111";
let count = 1;

while (numStr.length <= 4) {
    //지금 num이 N이면 카운트를 리턴
    if (numStr === N) {
        console.log(count);
        break;
    }

    // 숫자증가 + count 증가.
    // 0이 포함되면 시계수 아님
    // 자신을 rotate한 수중 더 작은 수가 있다면 시계수 아님
    // 시계수가 나올떄가지 num을 증가시키기
    while (true) {
        numStr = String(Number(numStr) + 1);
        // 0이 포함되었다면 그냥 continue;
        if (numStr.includes("0")) continue;

        let isClockNumber = true;
        let copyNumStr = numStr;
        for (let i = 1; i <= 3; i++) {
            copyNumStr = rotate(copyNumStr);

            // 둘 다 문자열이므로 숫자로 형변환해서 비교
            if (Number(copyNumStr) < Number(numStr)) {
                isClockNumber = false;
                break;
            }
        }
        // 시계수라면 break;
        if (isClockNumber) break;
    }
    count++;
}
