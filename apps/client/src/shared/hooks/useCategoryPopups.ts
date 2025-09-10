import { useState } from 'react';

export type PopupState =
  | { kind: 'create' }
  | { kind: 'edit'; id: number; name: string }
  | { kind: 'delete'; id: number; name: string }
  | null;

export function useCategoryPopups() {
  const [popup, setPopup] = useState<PopupState>(null);
  const openCreate = () => setPopup({ kind: 'create' });
  const openEdit = (id: number, name: string) =>
    setPopup({ kind: 'edit', id, name });
  const openDelete = (id: number, name: string) =>
    setPopup({ kind: 'delete', id, name });
  const close = () => setPopup(null);
  return { popup, openCreate, openEdit, openDelete, close };
}
