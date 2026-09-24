# git/branch

## 트리거

- "이슈 #123 브랜치 만들어줘"
- "브랜치 새로 파줘"
- "{기능} 작업 브랜치 만들어줘"

## 참조

- `docs/conventions/branch.md` → 브랜치 네이밍 형식
- `docs/conventions/merge.md` → develop 최신화 규칙

## Phase 1 — 계획 확인

1. 이슈번호와 작업 타입(`docs/conventions/commit.md`의 타입 목록 중 하나)을 확인한다. 사용자가 알려주지 않았다면 GitHub 이슈 제목/라벨을 조회하거나 직접 물어본다.
2. `docs/conventions/branch.md` 형식에 맞춘 브랜치명을 제안한다: `{타입}/#{이슈번호}/{기능명}`
3. 현재 브랜치가 `develop`이 아니거나 `develop`이 최신이 아닐 수 있으면 함께 안내한다.
4. 브랜치명과 실행 계획을 출력하고 사용자 승인을 기다린다. 승인 없이 Phase 2로 넘어가지 않는다.

## Phase 2 — 실행

1. `develop`으로 이동해 `git pull origin develop`으로 최신화한다.
2. 승인된 이름으로 `git checkout -b {브랜치명}`을 실행한다.
3. 생성된 브랜치명과 시작 커밋을 요약해 보고한다.
