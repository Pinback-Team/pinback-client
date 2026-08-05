# 브랜치 네이밍 컨벤션

## 형식

`{타입}/#{이슈번호}/{페이지 or 기능 이름}`

여러 단어가 연결된다면 `-`로 연결한다.

예시:
- `setting/#1/router-setting`
- `feat/#5/login`
- `fix/#6/register-form-bug-fix`

타입 목록은 [commit.md](./commit.md) 참고.

## 브랜치 생성 방법

```bash
# 브랜치 생성 + 이동
# 🚨 develop에서 만들었는지 무조건 확인하기
$ git checkout -b feat/#{이슈번호}/{기능명}
```

## 관련 규칙

병합·작업 기본 규칙은 [merge.md](./merge.md) 참고.
