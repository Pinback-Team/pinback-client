# code/page

## 트리거

- "새 페이지 만들어줘"
- "{이름} 페이지 스캐폴딩해줘"

## 참조

- `docs/conventions/architecture.md` → 폴더 구조

## Phase 1 — 계획 확인

1. 페이지명(camelCase)과 위치(`apps/{app}/src/pages/{name}`)를 확인한다.
2. 필요한 하위 폴더(`components`, `hooks`, `utils`, `types`, `apis`, `constants` 중 실제로 쓸 것만)를 확인한다.
3. 생성할 폴더/파일 목록을 출력하고 사용자 승인을 기다린다. 승인 없이 Phase 2로 넘어가지 않는다.

## Phase 2 — 실행

1. 승인된 하위 폴더만 `apps/{app}/src/pages/{name}/` 아래 생성한다 (빈 폴더는 자리표시 파일 없이 실제 파일과 함께 생성).
2. 라우팅 연결이 필요하면 `routes` 설정에 추가할지 사용자에게 확인한다.
3. 생성된 구조를 요약해 보고한다.
