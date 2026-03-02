import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

type UseInfiniteScrollProps = {
  /** 더 불러올 데이터가 있는지 */
  hasMore?: boolean;
  /** 추가 로딩 중인지 (중복 호출 방지용) */
  isLoadingMore?: boolean;
  /** 다음 데이터를 불러오는 함수 */
  loadMore: () => void | Promise<unknown>;

  /** 내부 스크롤 컨테이너를 root로 쓰고 싶을 때 */
  rootRef?: React.RefObject<HTMLElement | null>;

  /** 바닥에 닿기 전에 미리 불러오기 (ex: '200px 0px') */
  rootMargin?: string;

  /** 무한 스크롤을 일시적으로 끄기 */
  enabled?: boolean;
};

export const useInfiniteScroll = ({
  hasMore,
  isLoadingMore = false,
  loadMore,
  rootRef,
  rootMargin = '200px 0px',
  enabled = true,
}: UseInfiniteScrollProps) => {
  const [rootEl, setRootEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setRootEl(rootRef?.current ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lockRef = useRef(false);

  const { ref, inView } = useInView({
    root: rootEl,
    threshold: 0,
    rootMargin,
  });

  useEffect(() => {
    if (!enabled) return;
    if (!inView) return;
    if (!hasMore) return;
    if (isLoadingMore) return;
    if (lockRef.current) return;

    lockRef.current = true;
    Promise.resolve(loadMore()).finally(() => {
      lockRef.current = false;
    });
  }, [enabled, inView, hasMore, isLoadingMore, loadMore]);

  return ref;
};
