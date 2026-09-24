# 폴더 구조 & 기술 스택

## 폴더 구조

`shared/` 아래 폴더는 전부 common(공통)의 의미로 사용한다.
`pages/` 아래 세부 폴더(components, hooks 등)는 각 페이지에 종속된다.

```
Pinback Service
├─ apps
│  ├─ client
│  │  └─ src
│  │     ├─ shared         // 공통으로 재사용하는 코드 위치
│  │     │  ├─ components
│  │     │  ├─ hooks
│  │     │  ├─ utils
│  │     │  ├─ types
│  │     │  └─ ETC
│  │     └─ pages
│  │        ├─ dashBoard
│  │        │  ├─ components
│  │        │  ├─ hooks
│  │        │  ├─ utils
│  │        │  ├─ types
│  │        │  └─ ETC
│  │        └─ detail
│  ├─ extension
│  └─ landing
├─ config       // 모노레포 공통 config
│  ├─ eslint
│  └─ typescript
└─ packages     // 모노레포 공통 packages (ex. design-system)
   └─ design-system
```

컴포넌트 폴더명은 camelCase, 폴더 내 컴포넌트 파일명은 PascalCase다 (예: `components/balloon/Balloon.tsx`).

## 기술 스택

| 역할 | 스택 |
| --- | --- |
| UI Library | React |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Data Fetching | Axios |
| Server State Management | TanStack Query |
| UI Test | Storybook |
| Repository Management | Monorepo |
| Build System | Turborepo |
| Formatting | ESLint, Prettier |
| Package Manager | pnpm |
| Version Control | Git, GitHub |
| Deployment (초기 ver1) | Vercel |

## 관련 규칙

네이밍·코드 스타일은 [component.md](./component.md) 참고.
