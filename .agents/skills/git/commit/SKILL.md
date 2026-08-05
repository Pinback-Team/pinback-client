# git/commit

## 트리거

- "커밋해줘"
- "지금까지 한 거 커밋해줘"
- "커밋 메시지 작성해줘"

## 참조

- `docs/conventions/commit.md` → 타입 목록과 메시지 형식
- `docs/conventions/merge.md` → main/develop 직접 커밋 금지 규칙

## Phase 1 — 계획 확인

1. `git status`, `git diff`(staged+unstaged), 최근 `git log`를 확인해 변경 내용을 파악한다.
2. 현재 브랜치가 `main`/`develop`이면 즉시 중단하고 사용자에게 알린다 — 작업 브랜치에서만 커밋한다.
3. 변경 내용에 맞는 타입(`docs/conventions/commit.md` 목록 중)과 커밋 메시지를 `{타입}: {메시지}` 형식으로 초안 작성한다. 시크릿이 포함될 수 있는 파일(.env 등)은 내용을 확인하고 있다면 경고한다.
4. 초안을 출력하고 사용자 승인을 기다린다. 승인 없이 Phase 2로 넘어가지 않는다.

## Phase 2 — 실행

1. 승인된 범위만 `git add`로 스테이징한다 (`git add -A`/`git add .` 금지, 파일명을 지정한다).
2. 승인된 메시지로 커밋한다.
3. `git status`로 결과를 확인하고 요약 보고한다.
