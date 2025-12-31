import type { Icon as TablerIcon } from '@tabler/icons-react';
import { Page } from './page';

export class Category {
  categoryId!: number;
  name!: string;
  icon!: TablerIcon;
  permission!: string;
  pages: Page[] = [];
}
