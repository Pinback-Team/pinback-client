import { Dispatch, SetStateAction, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  usePostCategory,
  usePutCategory,
  useDeleteCategory,
} from '@shared/apis/queries';
import { SidebarTab } from '@shared/hooks/useSidebarNav';

interface Params {
  close: () => void;
  setActiveTab: Dispatch<SetStateAction<SidebarTab>>;
  setSelectedCategoryId: Dispatch<SetStateAction<number | null>>;
}

export function useCategoryActions({
  close,
  setActiveTab,
  setSelectedCategoryId,
}: Params) {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [toastIsOpen, setToastIsOpen] = useState(false);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: createCategory } = usePostCategory();
  const { mutate: patchCategory } = usePutCategory();
  const { mutate: deleteCategory } = useDeleteCategory();

  const handleCategoryChange = (name: string) => {
    setNewCategoryName(name);
  };

  const moveNewCategory = (id: number) => {
    navigate(`/my-bookmarks?id=${id}&category=${newCategoryName}`);
    setActiveTab('mybookmark');
    setSelectedCategoryId(id);
  };

  const handleCreateCategory = () => {
    createCategory(newCategoryName, {
      onSuccess: () => {
        setNewCategoryName('');
        queryClient.invalidateQueries({
          queryKey: ['dashboardCategories'],
        });
        close();
      },
      onError: () => setToastIsOpen(true),
    });
  };

  const handlePatchCategory = (id: number) => {
    patchCategory(
      { id, categoryName: newCategoryName },
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
