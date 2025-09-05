import { useCallback, useState } from 'react';

export type PopupState =
  | { kind: 'create' }
  | { kind: 'edit'; id: number; name: string }
  | { kind: 'delete'; id: number; name: string }
  | null;

export function useCategoryPopups() {
  const [popup, setPopup] = useState<PopupState>(null);

  const openCreate = useCallback(() => setPopup({ kind: 'create' }), []);
  const openEdit = useCallback(
    (id: number, name: string) => setPopup({ kind: 'edit', id, name }),
    []
  );
  const openDelete = useCallback(
    (id: number, name: string) => setPopup({ kind: 'delete', id, name }),
    []
  );
  const close = useCallback(() => setPopup(null), []);

  return { popup, openCreate, openEdit, openDelete, close };
}
