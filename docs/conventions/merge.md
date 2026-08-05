# 브랜치 병합(merge) & 기본 규칙

1. 메인 브랜치(`main`, `develop`)에서 직접 커밋하지 않는다.
2. 작업 브랜치(`feat` 등)에서만 커밋하고, 병합은 PR(Pull Request)을 통해서만 한다.
   - 병합 방식은 `squash merge`를 사용한다.
3. 작업 전에는 항상 `git pull origin develop`으로 최신화한다.
4. 팀원 리뷰 후 1명 이상의 approve를 받아야 병합할 수 있다.
