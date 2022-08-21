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

# 네트워크를 통해 백엔드에서 정보를 가져오는 test
### mock 을 이용해 정보 가지고 오는 추천하지 않는 코드 mock 을 너무 남용함
```
jest.mock('가져올 가짜 함수')
...

let productSevice;
const fetchItems = fest.fn(async () => [
    {item : "Milk", ~~},
    ...
])

ProductClient.mockImplementation(() => {
    fetchItems
}) // productClient 내부에서 import 해온 fetchItems 를 우리가 만든 mock fetchItems 로 바꿀거야
//장점은 네트워크에 환경적인 부분 제거하고 원하는 로직만 가져올 수 있음

breforeEach(() => {
    productService = new ProductService();
})
```

내부 의존성을 mock 으로 대체해서 사용

### mock 대신 stub 을 사용해보기
stub vs mock
둘다 진짜가 아닌 가짜
mock 구현사항이 없고 내가 원하는 부분사항만 가짜
Stub 기존에 쓰이는 진짜의 인터페이스를 다 충족하는 그런 느낌

stub_product_client 이런식으로 stub 을 만듬
class StubProductClient{
    async fetchItems(){
        retirm [
            {...~}
        ]
    }
}
이런식으로 동일한 인터페이스지만 바로 값을 반환하는 stub 을 만듬

```
//스텁 임포트 client 대신
...
let productService;
breforeEach(() => {
    productService = new ProductService(new StubClient); // DI 가 없이 class 를 먼저 만들자
})

...
```

단순히 데이터를 받아오는 것은 stub 이 나을 수 있지만 내부 로직 상에서 몇번 함수가 불러오는지나, 내부 로직들이 더 있을 땐 mock 도 같이 잘 고려해서 사용해야 한다.

### React 컴포넌트 test 해보기
사용자가 add를 눌렀을 때 어떤 동작들을 하는지
기본적인 test 형식은 같음

let onAdd;
breforeEach(() => {
    onAdd = jest.fn()
})

it('버튼 클릭시 onAdd 클릭', () => {
    //given
    render(<컴포넌트 onAdd = {onAdd}>)
    const input = screen.getByPlaceholderTest("Habit")
    const button = screen.getByText('Add');
    //when
    //userEvent, fireEvent 사용 가능 fireEvent 는 버튼에 초정이 없이 클릭
    userEvent.type(input, 'New Hp')
    userEvent.click(button)
    //then
    expect(onAdd).toHaveBeenCalledWith("New Hp")
})

렌더 작업과 input button 은 beforeEach 에서 해주기가 가능

### 스냅샷 test
현재 컴포넌트의 상태를 지금 상태로 보여줘야 한다는 걸 test 할 수 있는게 2가지 방법
1. 실제 object 를 스냅샷 해서 검사하는지
2. 화면에 표시되는 UI 자체를검사

스냅샷 test 는 작업을 한 후 예상치 않게 UI 가 변경되는 것을 막을 수 있음. 예샹하는 react render object 를 가지고 있다가 test 할 때 비교하는 것

npm installreact-test-renderer --save-dev 를 통해 설치 필요

it('render',() => {
    const component = renderer.create(<컴포넌트 props 전달/>)
    expect(component.toJSON()).toMatchSnapshot();
})

npm run test --coverage 를 통해 커버리지 확률 알 수 있음

### 전체 통합 test 하는 법
테스트에 범위에 따라 통합과 유닛 테스트가 나뉘어 진다

app 의 자체의 로직을 test 하는 것은 완전한 통합 test 라고 할 수 있음 가급적 사용자가 보는 항목을 사용해 test 를 진행하는 것이 좋다