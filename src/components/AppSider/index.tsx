import React, { useState } from 'react';
import { Menu } from 'antd';
import { useNavigate, useLocation } from 'umi';
import { menuData } from '@/config/menu';
import type { MenuItem } from '@/types/menu';
import './index.css';

interface AppSiderProps {
  collapsed?: boolean;
}

/**
 * 新视侧边栏菜单
 * Neo-Chinese Tech Luxury Aesthetic
 *
 * 设计特色：
 * - 父级展开态使用玉绿色，象征生长
 * - 子项选中态使用琥珀橙，象征成就
 * - VIP 标签采用金色渐变，营造尊贵感
 * - 微妙的悬停效果和过渡动画
 */
export const AppSider: React.FC<AppSiderProps> = ({ collapsed = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState<string[]>(['/discover']);

  // 转换菜单数据为 Ant Design Menu 格式
  const convertMenuItems = (items: MenuItem[]): any[] => {
    return items.map((item) => {
      const menuItem: any = {
        key: item.path,
        icon: item.icon,
        label: (
          <span className="menu-item-label">
            <span className="menu-item-text">{item.name}</span>
            {item.tag && <span className="menu-item-tag">{item.tag}</span>}
          </span>
        ),
      };

      if (item.children && item.children.length > 0) {
        menuItem.children = convertMenuItems(item.children);
      }

      return menuItem;
    });
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  const handleOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  return (
    <div className="app-sider">
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
        onClick={handleMenuClick}
        items={convertMenuItems(menuData)}
        className="app-menu"
        inlineCollapsed={collapsed}
      />
    </div>
  );
};
