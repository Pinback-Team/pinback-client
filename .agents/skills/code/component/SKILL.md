# code/component

## 트리거

- "컴포넌트 만들어줘"
- "{이름} 컴포넌트 생성해줘"

## 참조

- `docs/conventions/component.md` → 네이밍/코드 스타일 (rafce, fragment, 타입 위치 등)
- `docs/conventions/architecture.md` → 폴더 구조

## Phase 1 — 계획 확인

1. 컴포넌트 성격을 확인한다:
   - 여러 페이지에서 재사용 → `apps/{app}/src/shared/components/`
   - 특정 페이지 전용 → `apps/{app}/src/pages/{page}/components/`
   - 디자인 시스템(범용 UI) → `packages/design-system/src/components/`
2. 컴포넌트명(PascalCase)과 폴더명(camelCase), props 타입 필요 여부를 확인한다.
3. 배치 경로·파일명·props 타입 초안을 출력하고 사용자 승인을 기다린다. 승인 없이 Phase 2로 넘어가지 않는다.

## Phase 2 — 실행

1. `{경로}/{folderCamelCase}/{ComponentPascalCase}.tsx`를 생성한다.
2. `docs/conventions/component.md`의 컴포넌트 규칙을 따른다: `rafce` 형태, 의미 없는 `div` 대신 fragment, children 불필요 시 selfClosing, props 타입은 컴포넌트 상단에 정의.
3. 생성된 파일 경로를 요약해 보고한다.
