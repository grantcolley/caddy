import type { Icon as TablerIcon } from '@tabler/icons-react';
import { PageRoute } from './page-route';

export class Page extends PageRoute {
  name!: string;
  icon!: TablerIcon;
  permission!: string;
}
