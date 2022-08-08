# 리엑트 테스트 방법
1. 리엑트 컴포넌트 트리를 확인하는것 단위테스트 ...
2. 앱 자체가 잘 돌아가는지 확인 e2e test

# 테스팅 툴의 장단점
빠르게 test vs 사용자가 사용 직접 사용하는 것처럼 test
unit -> moking 하기 때문에 빠름 실제성이 조금 떨어질 수 있음
e2e -> realistic 하지만 네트워크나 정말 사용자가 사용하는 것처럼 보이기 떄문에 조금 느림 네트워크 상태에 따라 test가 실패 할 수도 있다.

얼마나 mock 을 할것인가 : 컴포넌트를 바라봤을 때 단위와 통합 test가 불명확할 수 있음

jest -> jsdom 을 사용하여 dom을 가진 환경처럼 비슷하게 동작 jest는 정말 좋은 반복 속도를 가지고 강력한 mocking 모듈이나 timers 를 준다

React Testing Library -> React components 를 테스트 할 수 있음 내부 구조 사항을 의존하지 않은 상태로

Jest 유닛 test 작성법

describe(test 이름, () => {
    초기 변수들 선언
    beforeEach(() => {초기화})
    it('test 이름', () => {
        have
        when
        then
        expect(변수).test할 메소드
    })
})