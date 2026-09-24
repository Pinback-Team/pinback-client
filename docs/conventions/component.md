# 코딩 컨벤션

## 기본(Default) 네이밍

1. 컴포넌트 / class → `PascalCase`
2. 폴더명 → `camelCase`
3. 파일명 *(컴포넌트 제외)* → `camelCase`
4. 변수, 함수 → `camelCase`
5. 파라미터 → `camelCase`
6. 상수 → `BIG_SNAKE_CASE`

## 변수

- `var` 금지.
- `const` → `let` 순서로 위부터 선언.
- 변수를 조합하여 문자열 생성 시 `+` 금지 → 리터럴(백틱 ``` `` ```) 사용.
- 변수명은 의미를 확실히 나타낼 수 있도록 작성한다.
  - 예: 배열에 `Arr`보다는 `fruits`, `userLists` 등.
- 줄임말을 쓰지 않는다. 이름이 길어지더라도 어떤 변수인지 정확하게 표현한다.
  - 예: `Btn` X → `Button`으로 사용.
- `map` 사용 시 변동되는 리스트라면 key값을 고유하게 설정한다. **`index` 사용 금지.**
  - 서버에서 내려주는 id값 또는 uuid 사용.
- **전역 변수**는 되도록 사용하지 않는다.
- 상수는 영문 대문자 스네이크 케이스로 작성한다: `API_KEY`

## 함수

- 화살표 함수 사용. `function` 키워드 금지.
- 중복 함수는 `utils` 폴더에 모아서 재사용한다.
- 변수/함수명은 20자 미만으로 작성한다.
  - 최대한 네이밍에 의미를 담아서 작성하고, 필요 시 주석으로 설명을 추가한다.
- 이벤트 핸들링 함수에는 `handle`을 붙인다. 그 외에는 금지.
  - 이벤트 핸들링 함수 예: `onClick`, `onMouseEnter`, `onMouseOut`, `onKeyPress`
  - 이벤트 핸들링 함수가 많을 때는 동작까지 포함한다: `handleResetClick`, `handleSubmitClick`
- boolean 관련 함수는 **`is` + 동작**으로 작성한다. 예외적으로 `has` 사용 가능.
- 필요하다면 early return 패턴을 적극적으로 활용한다.

  ```jsx
  // early return 패턴
  function processUser(user) {
    if (!user || !user.isActive) return; // 조건이 맞지 않으면 일찍 반환
    // 나머지 처리 코드...
  }
  ```

## 컴포넌트

- `rafce`(React Arrow Function Component with Export) 형태로 고정한다.
- 의미 없는 `div` 또는 컴포넌트 최상단은 `fragment`를 사용한다.

  ```jsx
  const InfoText = () => {
    return (
      <>
        <h1>Welcome!</h1>
        <p>This our new page, we're glad you're are here!</p>
      </>
    );
  };
  ```

- children이 불필요할 땐 selfClosing을 사용한다: `<Component/>`
- children을 적극적으로 활용한다.

## 타입

- object → `interface`
- 단일 변수 → type alias
- 컴포넌트 인자에 대한 타입은 컴포넌트 상단에 정의한다.
- 그 외의 타입들은 `types` 폴더에 정의한다.
- swagger 서버가 지원되면 openapi-typescript로 타입 생성을 자동화하는 것도 고려한다.

## 메소드

- 배열 복사 시 스프레드 연산자(`...`)를 사용한다: `const copies = [...originals]`
- `for`보다는 `forEach`/`map`을 사용한다.
- 구조 분해 할당을 적극 이용한다.

  ```tsx
  interface UserDataProps {
    userName: string;
    userBirth: string;
  }

  function checkIsUser({ userName, userBirth }: UserDataProps) {
    // ...
  }
  ```

- 불필요한 반복문(`filter`, `array.includes()` 등)을 지양한다.
  - 조건부로 데이터를 확인·추출하는 로직에는 `Map`이나 `Object`처럼 key값으로 원소를 찾는 자료형을 고려하거나, 배열을 순회하지 않고 index로 바로 접근할 수 있는 방법이 없는지 고려한다.

## 기타

- `button` 태그에는 `type`을 명시적으로 작성한다.
- 비교 연산자는 `===`와 `!==`만 사용한다.
- axios 호출 시 `then`/`catch` 대신 `async`/`await`를 지향한다.

## 관련 규칙

컴포넌트/파일 배치 위치는 [architecture.md](./architecture.md) 참고.
