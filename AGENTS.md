# pinback-client Agent Guide

Claude Code / Codex 공통 진입점입니다.
규칙 원문은 `docs/`에 있습니다 — 이 파일에 직접 넣지 마세요.

---

## 절대 규칙

작업 요청을 받으면 아래 순서를 반드시 지킨다:

1. 아래 트리거 표에서 요청에 해당하는 스킬을 찾는다.
2. **해당 SKILL.md 파일을 Read 도구로 먼저 읽는다. 읽기 전에 어떤 작업도 시작하지 않는다.**
3. 스킬 파일의 Phase 순서를 그대로 따른다.
4. 트리거가 두 스킬 이상에 걸리면 `meta/orchestrate`로 위임한다.

---

## 저장소

- Product: pinback-client — pnpm/turborepo 모노레포 (apps: client, extension, landing / packages: analytics, contracts, design-system 등)
- 도구: Claude Code, Codex
- 스택: TypeScript, React 19, Vite, Storybook, Vitest, Tailwind

---

## 트리거 → 스킬 매핑

### git

| 트리거 | Read 할 파일 |
| ------ | ------------ |
| "이슈 만들어줘", "이슈 올려줘", 새 작업 시작 전 | `.agents/skills/git/issue/SKILL.md` |
| "이슈 #123 브랜치 만들어줘", "브랜치 새로 파줘" | `.agents/skills/git/branch/SKILL.md` |
| "커밋해줘", "지금까지 한 거 커밋해줘", "변경사항 나눠서 커밋해줘" | `.agents/skills/git/commit/SKILL.md` |
| "PR 만들어줘", "PR 열어줘" | `.agents/skills/git/pr/SKILL.md` |

### code

| 트리거 | Read 할 파일 |
| ------ | ------------ |
| "컴포넌트 만들어줘", "{이름} 컴포넌트 생성해줘" | `.agents/skills/code/component/SKILL.md` |
| "새 페이지 만들어줘", "{이름} 페이지 스캐폴딩해줘" | `.agents/skills/code/page/SKILL.md` |

### figma

| 트리거 | Read 할 파일 |
| ------ | ------------ |
| "이 피그마 디자인 구현해줘", "피그마 링크 보고 컴포넌트 만들어줘" | `.agents/skills/figma/to-code/SKILL.md` |
| "이 컴포넌트/페이지 피그마로 만들어줘", "이 페이지 디자인 동기화해줘" | `.agents/skills/figma/to-figma/SKILL.md` |

### meta

| 트리거 | Read 할 파일 |
| ------ | ------------ |
| 두 개 이상 스킬이 걸리는 복합 요청 | `.agents/skills/meta/orchestrate/SKILL.md` |
| "이거 스킬로 만들어줘", "스킬 폐기해줘" | `.agents/skills/meta/manage/SKILL.md` |

---

## 문서 위치

| 내용 | 경로 |
| ---- | ---- |
| 브랜치 네이밍 | `docs/conventions/branch.md` |
| 커밋 메시지 | `docs/conventions/commit.md` |
| 병합·작업 기본 규칙 | `docs/conventions/merge.md` |
| 코딩/네이밍 컨벤션 | `docs/conventions/component.md` |
| 폴더 구조·기술 스택 | `docs/conventions/architecture.md` |
| 피그마 MCP 설정 | `docs/setup/figma-mcp.md` |
| 디자인 토큰 | `docs/design/tokens.md` |
