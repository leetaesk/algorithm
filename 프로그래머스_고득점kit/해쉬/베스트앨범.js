/**
 * 1. 재생 수 많은 장르순으로
 * 2. 재생 수 많은 곡 2개의 index 반환
 * 3. 재생 수 같은 곡이 있다면 index순서대로 반환, 2개 안된다면 1개만 반환
 */
function solution(genres, plays) {
    const answer = [];
    const map = new Map();
    for (let i = 0; i < genres.length; i++) {
        const genre = genres[i];
        const play = plays[i];
        // map생긴 거 => [장르, [[index, 재생 수]]]
        const prev = map.get(genre) || [];
        map.set(genre, [...prev, [i, play]]);
    }
    // 편의성으로 걍 배열로 뽑아내서 쓸래요
    const arr = [...map.entries()];
    // 첫번째 정렬 => 총 재생 수 많은 순서대로
    arr.sort(
        (a, b) =>
            b[1].reduce((acc, cur) => acc + cur[1], 0) -
            a[1].reduce((acc, cur) => acc + cur[1], 0)
    );
    for (let ar of arr) {
        // 구조분해할당
        const [genre, musics] = ar;
        // musics를 정렬하고 앞 두개요소의 인덱스번호만 answer에 담기
        const sortedMusics = musics.sort((a, b) => b[1] - a[1]).slice(0, 2);
        sortedMusics.forEach((i) => answer.push(i[0]));
    }
    return answer;
}
/**
 * 최적화코드
 */
function solution(genres, plays) {
    const map = new Map();

    // 1. 데이터 집계 (한 번의 순회로 끝냄)
    for (let i = 0; i < genres.length; i++) {
        const genre = genres[i];
        const play = plays[i];

        // 해당 장르가 없으면 초기화
        if (!map.has(genre)) {
            // 이렇게 생겼음. 객체사용 & 데이터집계시 total 미리 계산해서 reduce 삭제
            map.set(genre, { total: 0, songs: [] });
        }

        // 데이터 업데이트 (push 사용, total 누적)
        const data = map.get(genre);
        data.total += play; // reduce 대신 미리 더하기
        data.songs.push({ id: i, play: play }); // spread 대신 push => spread도 O(n)이라 잘 안 좋은 듯
    }

    // 2. 장르별 정렬 & 노래 추출
    // Map.values()만 있으면 충분함 (Key인 장르 이름은 이제 필요 없음)
    return (
        [...map.values()]
            .sort((a, b) => b.total - a.total) // 미리 계산된 total로 정렬 (빠름)
            // flatMap으로 최적화
            .flatMap((data) => {
                return data.songs
                    .sort((a, b) => {
                        // 재생수 내림차순, 같다면 고유번호 오름차순
                        if (b.play !== a.play) return b.play - a.play;
                        return a.id - b.id;
                    })
                    .slice(0, 2)
                    .map((song) => song.id);
            })
    );
}
