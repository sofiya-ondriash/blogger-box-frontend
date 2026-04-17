import { Category } from './category';

export interface Post {
  id: string;
  title: string;
  content: string;
  category: Category | null;
  createdDate: string;
}

export type PostCreateInput = Omit<Post, 'id' | 'createdDate' | 'category'> & {
  categoryId: string;
};
