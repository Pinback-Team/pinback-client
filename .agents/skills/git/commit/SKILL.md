# git/commit

## 트리거

- "커밋해줘"
- "커밋 만들어줘"
- "지금까지 한 거 커밋해줘"
- "변경사항 나눠서 커밋해줘"

## 참조

- `docs/conventions/commit.md` → 타입 목록과 메시지 형식
- `docs/conventions/merge.md` → main/develop 직접 커밋 금지 규칙

## 핵심 원칙

1. **secret guard 먼저**: `.env`류 파일, password, api key, secret, token 패턴이 스테이징/변경분에 있으면 즉시 멈추고 알린다.
2. **atomic 단위 분리**: 논리적으로 무관한 변경은 별도 커밋으로 나눈다.
3. **2단계 진행**: Phase 1(계획표+승인) → Phase 2(실행). 승인 없이 커밋하지 않는다.
4. **push는 명시적 요청 시에만** 수행한다.

## Phase 1 — 계획 확인

1. `git status`, `git diff`(staged+unstaged), 최근 `git log`로 변경 내용을 파악한다.
2. 현재 브랜치가 `main`/`develop`이면 즉시 중단하고 사용자에게 알린다.
3. **secret guard**: 변경된 파일에서 `.env`류 파일, `password`, `api_key`, `secret`, `token` 패턴을 검색한다. 발견되면 즉시 멈추고 사용자에게 알린다 — 확인 없이 다음 단계로 넘어가지 않는다.
4. 변경 파일들을 도메인/기능/계층 단위로 분류한다. 서로 무관한 변경(예: 의존성 변경 vs 핵심 구현 vs 설정)은 별도 커밋으로 나눈다.
5. 각 그룹마다 `docs/conventions/commit.md` 형식(`{타입}: {메시지}`)의 커밋 메시지 초안을 작성한다.
6. 아래 형식으로 계획표를 출력하고 사용자 승인을 기다린다. 승인 없이 Phase 2로 넘어가지 않는다.

```
## 커밋 계획

### 커밋 1: feat: 소셜 로그인 컴포넌트 추가
- apps/client/src/pages/login/components/SocialLogin.tsx

### 커밋 2: chore: turbo filter 스크립트 추가
- package.json

계속 진행할까요?
```

## Phase 2 — 실행

1. 승인된 각 그룹만 순서대로 `git add {파일명}`으로 스테이징한다 (`git add -A`/`git add .` 금지, 파일명을 지정한다).
2. 그룹별로 승인된 메시지로 커밋한다.
3. `git log --oneline -n {커밋 수}`로 결과를 확인하고 요약 보고한다.

## 금지

- `--no-verify` 사용 금지 (사용자가 요청해도 이유를 먼저 묻는다).
- 스테이징되지 않은 파일을 임의로 전부 `add`하지 않는다.
- `.env`, 인증서, 토큰 파일을 커밋에 포함하지 않는다.
- 승인 없이 커밋을 실행하지 않는다.
