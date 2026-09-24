# git/issue

## 트리거

- "이슈 만들어줘"
- "이슈 올려줘"
- "이슈 써줘"
- 새 기능 개발 또는 버그 수정을 시작하기 전

인자 없이 실행하면 현재 대화 컨텍스트에서 작업 내용을 추론한다.

## 참조

- `.github/ISSUE_TEMPLATE/{feature,fix,refactor}.yml` → 이슈 제목/라벨/본문 템플릿 (Pinback은 이 3종류만 존재)
- `.agents/skills/git/branch/SKILL.md` → 브랜치 생성은 이 스킬에 위임한다 (중복 구현 금지)

## Phase 1 — 계획 확인

1. 타입을 확인한다: `Feat`(새 기능) / `Fix`(버그) / `Refactor`(리팩터링) 중 하나. 대화 컨텍스트로 추론하고, 애매하면 사용자에게 확인한다.
   - Pinback 이슈 템플릿은 이 3종류만 존재한다. `setting`/`chore` 등 나머지 타입은 이슈 없이 바로 `git/branch`로 진행할 수 있다.
2. 제목: 템플릿에 고정된 프리픽스(`[Feat] `/`[Fix] `/`[Refactor] `) + 한국어 요약.
3. 본문: 해당 템플릿의 `Task Description`(필수) / `ETC`(선택) 필드에 맞춰 작성한다.
4. 아래 형식으로 계획표를 출력하고 사용자 승인을 기다린다. 승인 없이 Phase 2로 넘어가지 않는다.

```
## 이슈 생성 계획

타입: Feat
제목: [Feat] 소셜 로그인 기능 구현
라벨: 📌 feat
Assignee: @me

### 본문 미리보기
---
### Task Description

...

### ETC

...
---

계속 진행할까요?
```

## Phase 2 — 이슈 생성

```bash
gh issue create \
  --title "[Feat] 소셜 로그인 기능 구현" \
  --body "$(cat <<'EOF'
### Task Description

...

### ETC

...
EOF
)" \
  --label "📌 feat" \
  --assignee "@me"
```

생성된 이슈 URL에서 이슈 번호를 추출한다.

## Phase 3 — 브랜치 생성

이슈 번호를 확보했으면 `.agents/skills/git/branch/SKILL.md`의 Phase 1로 이어서 진행한다. 브랜치 네이밍·develop 최신화는 해당 스킬 규칙을 그대로 따른다.

## 주의사항

- assignee는 항상 `@me`.
- `gh` CLI 미인증 시 `gh auth login`을 안내하고 중단한다.
- 같은 이름의 이슈/브랜치가 이미 있으면 사용자에게 알리고 다른 이름을 제안한다.

## 금지

- 사용자 승인 없이 이슈를 생성하지 않는다.
