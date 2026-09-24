# figma/to-code

## 트리거

- "이 피그마 디자인 구현해줘"
- "피그마 링크 보고 컴포넌트 만들어줘"

## 사전 설정

- `docs/setup/figma-mcp.md` → Figma MCP 연동 설정. 세션에 Figma MCP 도구가 없으면 먼저 이 문서를 안내한다.

## 참조

- `docs/conventions/component.md` → 네이밍/코드 스타일
- `docs/conventions/architecture.md` → 폴더 구조
- `docs/design/tokens.md` → 색상/spacing/타이포그래피 토큰
- `.agents/skills/code/component/SKILL.md` → 배치 위치(shared/pages/design-system) 판단 및 파일 생성 절차

## Phase 1 — 디자인 컨텍스트 확보 및 계획

1. 공유된 Figma URL로 디자인 컨텍스트(구조, 스크린샷, 변수/토큰)를 가져온다.
2. 추출한 구조를 컴포넌트 단위로 분해하고, `code/component` 스킬의 Phase 1 배치 기준을 그대로 적용해 각 컴포넌트의 배치 위치(shared/pages/design-system)를 정한다.
3. 컴포넌트 목록 + 배치 경로 + 스타일 매핑 개요(어떤 값이 `docs/design/tokens.md`에 있고, 없는 값은 무엇인지)를 출력하고 사용자 승인을 기다린다. 승인 없이 Phase 2로 넘어가지 않는다.

## Phase 2 — 구현

1. `code/component` 스킬의 Phase 2를 그대로 따라 파일을 생성한다 (rafce, fragment, props 타입 위치 등 `component.md` 규칙 적용).
2. 색상/spacing/타이포그래피는 `docs/design/tokens.md`에 등록된 토큰으로만 매핑한다. 표에 없는 값이 필요하면 hex/px를 하드코딩하지 않고, 토큰을 새로 추가할지 먼저 사용자에게 확인한다.
3. 구현 결과를 디자인 스크린샷과 비교해 자체 점검하고 요약 보고한다.
