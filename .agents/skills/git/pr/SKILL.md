# git/pr

## 트리거

- "PR 만들어줘"
- "PR 열어줘"
- "이 브랜치로 PR 생성해줘"
- 브랜치 작업이 완료되고 `develop`으로 머지 준비가 된 시점

## 참조

- `.github/pull_request_template.md` → PR 본문 템플릿
- `docs/conventions/merge.md` → 병합 방식(squash), approve 조건
- `docs/conventions/commit.md` → 제목에 쓰는 타입 목록

## 핵심 원칙

1. **전체 diff 기준**: `develop` 대비 전체 변경을 분석한다. 최신 커밋 하나만 보지 않는다.
2. **제목은 `{Type}(scope): 한국어 요약` 형식** — `docs/conventions/commit.md` 타입 목록을 따른다 (예: `Feat(client): 소셜 로그인 기능 구현`).
3. **근거 기반으로 쓴다**: 실제로 실행·확인한 명령/화면만 적는다. 확인하지 않은 증거를 만들지 않는다.
4. **구현 의도를 설명한다**: 무엇을 바꿨는지는 diff가 대신한다. 왜 이 구조를 택했는지, 어떤 문제를 해결했는지를 적는다.
5. **실제 검증과 계획된 검증을 분리한다**: 실행하지 않은 명령은 통과했다고 쓰지 않는다.
6. **base 브랜치 확인**: 기본값은 `develop`. 다르면 먼저 사용자에게 물어본다.

## Phase 1 — 계획 확인

1. base 브랜치를 확인한다 (기본 `develop`, 다르면 먼저 사용자에게 확인).
2. `git log {base}..HEAD --oneline --reverse`, `git diff {base}...HEAD --stat`, `--name-only`으로 전체 변경사항을 파악한다.
3. 브랜치명에서 이슈번호를 추출하고 관련 이슈 내용을 확인한다.
4. `pnpm check-types`, `pnpm lint`를 실행해 통과 여부를 확인한다. 실패하면 PR 작성 전에 먼저 사용자에게 알리고 진행 여부를 묻는다.
5. `.github/pull_request_template.md` 형식에 맞춰 초안을 작성한다:
   - **Related Issues**: 브랜치의 이슈번호로 `close #N`
   - **Tasks**: 변경 파일 나열로 끝내지 않는다. 변경 단위(도메인/기능)별로 무엇을·왜 바꿨는지 서술한다.
   - **PR Point (To Reviewer)**: 판단이 필요한 구조 선택, 남은 리스크, 의도적으로 제외한 범위, `pnpm check-types`/`pnpm lint` 실행 결과를 적는다.
   - **Screenshot**: UI 변경이 있으면 실제로 확인한 화면만 첨부하도록 안내한다 (표로 정리 제안). UI 변경이 없거나 확인하지 않았으면 섹션을 생략한다.
6. 초안을 출력하고 사용자 승인을 기다린다. 승인 없이 Phase 2로 넘어가지 않는다.

## Phase 2 — 실행

1. 필요 시 원격에 브랜치를 push한다.
2. 승인된 제목/본문으로 `gh pr create --base {base}`를 실행한다.
3. 리뷰어는 `review-assign.yml` 워크플로우가 자동 지정하므로 별도로 지정하지 않는다. reviewer/milestone은 사용자가 명시한 경우에만 추가한다.
4. PR URL을 보고한다.

## 금지

- PR을 병합하지 않는다. 병합은 2명 이상 approve 후 사용자가 직접 처리한다.
- force-push로 base 브랜치를 덮어쓰지 않는다.
- 실행하지 않은 명령을 통과했다고 기록하지 않는다.
- 없는 증거(screenshot, 실행 결과 등)를 있는 것처럼 쓰지 않는다.
