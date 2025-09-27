import { useEffect, useRef } from 'react';

interface UseInfiniteScrollProps {
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  root?: React.RefObject<HTMLElement | null>;
  threshold?: number;
}

/**
 * Intersection Observer를 사용하여 무한 스크롤을 구현하는 커스텀 훅
 * @returns observer가 감지할 엘리먼트에 연결할 ref 객체
 */

export const useInfiniteScroll = ({
  fetchNextPage,
  hasNextPage,
  root,
  threshold = 0.5,
}: UseInfiniteScrollProps) => {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      {
        root: root?.current,
        threshold,
      }
    );

    const currentTarget = targetRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [fetchNextPage, hasNextPage, root, threshold]);

  return targetRef;
};
