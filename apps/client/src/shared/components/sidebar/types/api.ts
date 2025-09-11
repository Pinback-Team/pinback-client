export interface Category {
  categoryId: number;
  categoryName: string;
  unreadCount: number;
}

export interface DashboardCategoriesResponse {
  categories: Category[];
}
