import { useCallback, useEffect, useRef, useState } from 'react';

export type AnchoredPoint = { top: number; left: number };
export type GetPos = (anchor: HTMLElement) => AnchoredPoint;

export type AnchoredMenuState = {
  open: boolean;
  categoryId: number | null;
  anchorEl: HTMLElement | null;
  pos: AnchoredPoint | null;
};

export function useAnchoredMenu(getPos: GetPos) {
  const [state, setState] = useState<AnchoredMenuState>({
    open: false,
    categoryId: null,
    anchorEl: null,
    pos: null,
  });

  const containerRef = useRef<HTMLDivElement | null>(null);

  const open = useCallback(
    (categoryId: number, anchorEl: HTMLElement) => {
      setState({
        open: true,
        categoryId,
        anchorEl,
        pos: getPos(anchorEl),
      });
    },
    [getPos]
  );

  const close = useCallback(() => {
    setState({ open: false, categoryId: null, anchorEl: null, pos: null });
  }, []);

  useEffect(() => {
    if (!state.open) return;

    const syncPos = () => {
      if (state.anchorEl) {
        setState((s) => ({ ...s, pos: getPos(state.anchorEl!) }));
      }
    };

    const onDocMouseDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (
        state.anchorEl &&
        !state.anchorEl.contains(t) &&
        !containerRef.current?.contains(t)
      ) {
        close();
      }
    };

    window.addEventListener('scroll', syncPos, true);
    window.addEventListener('resize', syncPos);
    document.addEventListener('mousedown', onDocMouseDown);

    return () => {
      window.removeEventListener('scroll', syncPos, true);
      window.removeEventListener('resize', syncPos);
      document.removeEventListener('mousedown', onDocMouseDown);
    };
  }, [state.open, state.anchorEl, close, getPos]);

  const style = state.pos
    ? ({
        position: 'fixed',
        top: state.pos.top,
        left: state.pos.left,
        zIndex: 9999,
      } as const)
    : undefined;

  return {
    state,
    open,
    close,
    containerRef,
    style,
  };
}
