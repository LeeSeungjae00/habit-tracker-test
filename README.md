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

# Jest 유닛 test 작성법

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

# 오브젝트 불변성 테스트도 진행하기

# 비동기 test 하기
expect(Promise).resolve.toEqual(..)
async, await 사용하여 test

# Mock, Stub 에 대하여
mock function 을 통해 호출 되었는지 어떤 인자 값을 받았는지, 리턴값이 전달되는지 test 가능
```
beforeEach(() => {
    변수 = jest.fn(); // mock 함수
})
it(~~~, () => {
    check(()=> true, onSuccess, onFail);
    expect(onSuccess.mock.calls.length).toBe(1) //-> onSuccess 라는 함수가 1번이라도 호출 된다
    expect(onSuccess).toHaveBeenCalledTimes(1) // 위와 동일
    expect(onSuccess.mock.calls[0][0]).toBe('yes') //-> onSuccess 라는 함수에 yes라는 인자가 전달된다
    expect(onSuccess).toHaveBeenCalledWith('yes') // 위와 동일
})
```
