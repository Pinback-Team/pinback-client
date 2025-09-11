export interface Category {
  id: number;
  name: string;
  unreadCount: number;
}

export interface DashboardCategoriesResponse {
  categories: Category[];
}
