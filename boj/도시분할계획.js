const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = `7 12
1 2 3
1 3 2
3 2 1
2 5 2
3 4 4
7 3 6
5 1 5
1 6 2
6 4 1
6 5 3
4 5 3
6 7 4`
    .toString()
    .trim()
    .split("\n");

// 십만,백만
const [N, M] = input[0].split(" ").map(Number);

// 길 정보 배열
const roads = input.slice(1).map((line) => line.split(" ").map(Number));

// 크루스칼 => 그래프를 간선의 가중치로 정렬. 그래프를 순회하면서 부모노드가 같다 => 잇지말고 부모노드가 다르면 잇는다.
roads.sort((a, b) => a[2] - b[2]);

const parent = Array.from({ length: N + 1 }, (_, idx) => idx);

// find == 최상부모를 찾는 재귀함수?
const find = (node) => {
    if (node === parent[node]) return node;
    return (parent[node] = find(parent[node]));
};

// union == a,b의 부모가 다르다면 b의 최상부모의 부모를 a의 최상부모로 변경하여 합쳐주는 함수
// 이미 이어져있다면 false를 반환
const union = (a, b) => {
    let root1 = find(a);
    let root2 = find(b);
    if (root1 !== root2) {
        parent[root2] = root1;
        return true;
    }
    return false;
};

const answer = [];

// 크루스칼 알고리즘
// start,end를 이었을 때 사이클이 아니라면 연결하고, 사이클이라면 버린다 => 최소스패닝트리
for (let [start, end, tax] of roads) {
    if (union(start, end)) {
        answer.push(tax);
    }
}

// 만들어진 최소신장트리에서 가중치값이 가장 큰 길 하나를 제거한다.
answer.pop();
console.log(answer.reduce((acc, cur) => acc + cur, 0));

/**
 * 내 코드
 * const [N,M] = input[0].split(' ').map(Number)
const roads = input.slice(1).map((s) => s.split(' ').map(Number))

roads.sort((a,b) => a[2] - b[2])

const parent = Array.from({length:N+1}, (_,i) => i)

const getParent = (i) => {
    if (i === parent[i]) return i;
    parent[i] = getParent(parent[i])
    return parent[i]
}

// 부모가 다르면 이어주고, 부모가 같으면 false리턴함수 union
const union = (a,b) => {
    let parentA = getParent(a)
    let parentB = getParent(b)
    
    if (parentA === parentB) return false;
    else {
        parent[b] = getParent(a)
        return true;
    }
}

const answers = [];

for (let [s,e,cost] of roads) {
    if (union(a,b)) {
        answers.push(cost)
    }
}

answers.pop();
console.log(answers.reduce((acc,cur) => acc + cur, 0))
 */
