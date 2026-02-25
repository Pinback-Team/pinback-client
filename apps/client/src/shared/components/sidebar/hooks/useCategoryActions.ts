import { Dispatch, SetStateAction, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  usePostCategory,
  usePatchCategory,
  useDeleteCategory,
} from '@shared/apis/queries';
import { SidebarTab } from '@shared/hooks/useSidebarNav';

interface CategoryActionsParams {
  close: () => void;
  setActiveTab: Dispatch<SetStateAction<SidebarTab>>;
  setSelectedCategoryId: Dispatch<SetStateAction<number | null>>;
}

export function useCategoryActions({
  close,
  setActiveTab,
  setSelectedCategoryId,
}: CategoryActionsParams) {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [toastIsOpen, setToastIsOpen] = useState(false);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: createCategory } = usePostCategory();
  const { mutate: patchCategory } = usePatchCategory();
  const { mutate: deleteCategory } = useDeleteCategory();

  const handleCategoryChange = (name: string) => {
    setNewCategoryName(name);
  };

  const moveNewCategory = (id: number) => {
    navigate(
      `/my-bookmarks?id=${id}&category=${encodeURIComponent(newCategoryName)}`
    );
    setActiveTab('mybookmark');
    setSelectedCategoryId(id);
  };
  const handleCreateCategory = (isPublic: boolean) => {
    createCategory(
      {
        categoryName: newCategoryName,
        isPublic,
      },
      {
        onSuccess: () => {
          setNewCategoryName('');

          queryClient.invalidateQueries({
            queryKey: ['dashboardCategories'],
          });

          close();
        },
        onError: () => setToastIsOpen(true),
      }
    );
  };

  const handlePatchCategory = (
    id: number,
    name?: string,
    isPublic?: boolean
  ) => {
    if (!name) return;

    patchCategory(
      {
        id,
        categoryName: name,
        isPublic: isPublic ?? false,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['dashboardCategories'],
          });

          setNewCategoryName('');
          close();
          moveNewCategory(id);
        },
        onError: () => setToastIsOpen(true),
      }
    );
  };

  const handleDeleteCategory = (id: number) => {
    deleteCategory(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['dashboardCategories'],
        });
        close();
      },
      onError: () => setToastIsOpen(true),
    });
  };

  const handlePopupClose = () => {
    setToastIsOpen(false);
    close();
  };

  return {
    newCategoryName,
    toastIsOpen,
    setToastIsOpen,

    handleCategoryChange,
    handleCreateCategory,
    handlePatchCategory,
    handleDeleteCategory,
    handlePopupClose,
  };
}
