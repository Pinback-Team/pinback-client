import {
  useDeleteCategory,
  useGetCategoryDetail,
  usePatchCategory,
  usePostCategory,
} from '@shared/apis/queries';
import { SidebarTab } from '@shared/hooks/useSidebarNav';
import { useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const { mutate: getCategoryDetail, data: categoryDetail } =
    useGetCategoryDetail();

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

  const handleOpenEditCategory = (id: number, openPopup: () => void) => {
    getCategoryDetail(id, {
      onSuccess: () => {
        openPopup();
      },
      onError: () => setToastIsOpen(true),
    });
  };

  const handlePopupClose = () => {
    setToastIsOpen(false);
    close();
  };

  const handleEditCategory = (
    id: number,
    openEdit: (id: number, name: string, isPublic: boolean) => void,
    closeMenu: () => void
  ) => {
    getCategoryDetail(id, {
      onSuccess: (data) => {
        openEdit(data.categoryId, data.categoryName, data.isPublic);
      },
      onError: () => setToastIsOpen(true),
    });

    closeMenu();
  };

  return {
    newCategoryName,
    toastIsOpen,
    setToastIsOpen,
    categoryDetail,
    handleCategoryChange,
    handleCreateCategory,
    handlePatchCategory,
    handleDeleteCategory,
    handlePopupClose,
    handleOpenEditCategory,
    handleEditCategory,
  };
}
