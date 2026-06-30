import { Image } from '../../@types/common.interface';

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  display: string;
  image: Image | null;
  menu_order: number;
  count: number;
}
