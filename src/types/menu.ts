import type { ReactNode } from 'react';

/**
 * 菜单项类型定义
 */
export interface MenuItem {
  path: string;
  name: string;
  icon?: ReactNode;
  tag?: ReactNode;
  children?: MenuItem[];
  hideInMenu?: boolean;
}
