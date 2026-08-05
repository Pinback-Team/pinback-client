# git/pr

## 트리거

- "PR 만들어줘"
- "PR 열어줘"
- "이 브랜치로 PR 생성해줘"

## 참조

- `.github/pull_request_template.md` → PR 본문 템플릿
- `docs/conventions/merge.md` → 병합 방식(squash), approve 조건

## Phase 1 — 계획 확인

1. 현재 브랜치와 `develop` 기준 커밋/변경사항을 확인한다 (`git log develop..HEAD`, `git diff develop...HEAD --stat`).
2. 브랜치명에서 이슈번호를 추출하고, 관련 이슈 내용을 확인한다.
3. `.github/pull_request_template.md` 형식(관련 이슈, Tasks, PR Point, Screenshot)에 맞춰 PR 제목과 본문을 초안 작성한다.
4. 초안을 출력하고 사용자 승인을 기다린다. 승인 없이 Phase 2로 넘어가지 않는다.

## Phase 2 — 실행

1. 필요 시 원격에 브랜치를 push한다.
2. 승인된 제목/본문으로 `gh pr create`를 실행한다.
3. 리뷰어는 `review-assign.yml` 워크플로우가 자동 지정하므로 별도로 지정하지 않는다.
4. PR URL을 보고한다. 병합은 2명 이상 approve 후 사용자가 직접 처리하며, 이 스킬은 병합을 수행하지 않는다.
