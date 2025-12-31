import type { Icon as TablerIcon } from '@tabler/icons-react';
import { Category } from './category';

export class Module {
  moduleId!: number;
  name!: string;
  icon!: TablerIcon;
  permission!: string;
  categories: Category[] = [];
}
