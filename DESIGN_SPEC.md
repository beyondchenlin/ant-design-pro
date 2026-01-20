# 懒人同城号 - Ant Design Pro 设计规范文档

## 1. 项目概述

### 1.1 设计目标
基于 Ant Design Pro 设计语言，1:1 复刻同城号发现平台界面，实现左侧导航、中间地图展示、右侧排行榜的三栏布局结构。

### 1.2 技术栈
- **框架**: React 18+
- **UI 库**: Ant Design Pro 5.x
- **布局**: ProLayout
- **地图**: 高德地图 (AMap) / 腾讯地图
- **状态管理**: React Hooks / Umi Model
- **路由**: Umi 4.x
- **动画**: Ant Design 内置动效 + CSS Transitions

### 1.3 品牌色彩系统

基于原型界面提炼的品牌色系统，覆盖 Ant Design 默认主题：

```typescript
// config/theme.ts - 品牌色彩系统
export const brandColors = {
  // 主色系
  primary: '#52c41a',        // 品牌绿（地图标记、成功状态）
  primaryHover: '#73d13d',   // 品牌绿悬停态
  primaryActive: '#389e0d',  // 品牌绿激活态

  // 强调色系
  accent: '#ff7a00',         // 强调橙（选中态、高亮）
  accentHover: '#ff9633',    // 强调橙悬停态
  accentLight: '#fff7e6',    // 强调橙浅底色

  // 中性色系
  siderBg: '#001529',        // 侧边栏深蓝黑
  siderBgLight: '#ffffff',   // 侧边栏浅色模式
  headerBg: '#ffffff',       // 顶部栏白色
  bodyBg: '#f0f2f5',         // 页面背景灰
  cardBg: '#ffffff',         // 卡片背景白

  // 文字色系
  textPrimary: '#262626',    // 主文字
  textSecondary: '#8c8c8c',  // 次要文字
  textDisabled: '#bfbfbf',   // 禁用文字

  // 边框色系
  borderBase: '#d9d9d9',     // 基础边框
  borderLight: '#f0f0f0',    // 浅边框

  // 排名色系
  rankGold: '#faad14',       // Top 1 金色
  rankSilver: '#a0a0a0',     // Top 2 银色
  rankBronze: '#d48806',     // Top 3 铜色
};
```

---

## 2. 整体布局架构

### 2.1 布局结构
使用 Ant Design Pro 的 `ProLayout` 组件实现标准三栏布局：

```
┌─────────────────────────────────────────────────────────┐
│  Header (顶部导航栏)                                      │
├──────────┬──────────────────────────────┬───────────────┤
│          │                              │               │
│  Sider   │     Content (地图区域)        │  Right Panel  │
│  (导航)   │                              │  (排行榜)      │
│          │                              │               │
│  240px   │         flex: 1              │    320px      │
└──────────┴──────────────────────────────┴───────────────┘
```

### 2.2 核心组件映射

| 界面区域 | Ant Design Pro 组件 | 说明 |
|---------|-------------------|------|
| 整体布局 | `ProLayout` | 提供标准后台布局框架 |
| 顶部导航 | `ProLayout.Header` | 品牌 logo、搜索、用户操作 |
| 左侧菜单 | `ProLayout.Sider` + `Menu` | 可折叠侧边导航 |
| 地图容器 | `Card` (无边框) | 包裹地图组件 |
| 城市筛选 | `Space` + `Tag.CheckableTag` | 可选择标签组 |
| 排行榜 | `Card` + `List` | 用户排行列表 |
| 用户项 | `List.Item` + `Avatar` + `Tag` | 单个用户信息展示 |

---

## 3. 详细组件设计

### 3.1 顶部导航栏 (Header)

#### 3.1.1 布局结构

基于原型截图，顶部导航栏采用左-中-右三段式布局：

```tsx
// components/Header/index.tsx
import React from 'react';
import { Space, Button, Avatar, Tooltip, Badge } from 'antd';
import {
  SearchOutlined,
  BellOutlined,
  LaptopOutlined,
  MobileOutlined,
  TabletOutlined,
} from '@ant-design/icons';

export const AppHeader: React.FC = () => (
  <div className="app-header">
    {/* 左侧：品牌 Logo + 面包屑 */}
    <div className="header-left">
      <div className="logo-section">
        <span className="brand-name">懒人同城号</span>
      </div>
      <div className="breadcrumb-section">
        <span className="breadcrumb-icon">☰</span>
        <span className="breadcrumb-text">地域找号</span>
      </div>
    </div>

    {/* 右侧：功能按钮组 */}
    <div className="header-right">
      <Space size="middle" align="center">
        {/* 功能地图按钮 */}
        <Button type="primary" className="feature-map-btn">
          <span className="btn-icon">🗺️</span>
          功能地图
        </Button>

        {/* 图标按钮组 */}
        <Tooltip title="搜索">
          <Button type="text" icon={<SearchOutlined />} />
        </Tooltip>
        <Tooltip title="电脑端">
          <Button type="text" icon={<LaptopOutlined />} />
        </Tooltip>
        <Tooltip title="移动端">
          <Button type="text" icon={<MobileOutlined />} />
        </Tooltip>
        <Tooltip title="平板端">
          <Button type="text" icon={<TabletOutlined />} />
        </Tooltip>

        {/* 积分/货币 */}
        <span className="credits-display">0</span>

        {/* 消息通知 */}
        <Badge count={0} showZero={false}>
          <Button type="text" icon={<BellOutlined />} />
        </Badge>

        {/* 用户头像 */}
        <Avatar src="/user-avatar.png" size={32} />

        {/* 开通 VIP */}
        <Button className="vip-btn">开通VIP</Button>

        {/* 新榜品牌 */}
        <span className="newrank-brand">新榜</span>
      </Space>
    </div>
  </div>
);
```

#### 3.1.2 样式规范

```css
/* styles/header.css */
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  padding: 0 16px;
  background: #ffffff;
  border-bottom: 1px solid #f0f0f0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 24px;
}

.brand-name {
  font-size: 20px;
  font-weight: 600;
  color: #52c41a; /* 品牌绿 */
}

.breadcrumb-section {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #595959;
  font-size: 14px;
}

.breadcrumb-icon {
  color: #8c8c8c;
}

.header-right {
  display: flex;
  align-items: center;
}

/* 功能地图按钮 */
.feature-map-btn {
  background: #52c41a;
  border-color: #52c41a;
  display: flex;
  align-items: center;
  gap: 4px;
}

.feature-map-btn:hover {
  background: #73d13d;
  border-color: #73d13d;
}

/* VIP 按钮 */
.vip-btn {
  background: linear-gradient(90deg, #ffd700 0%, #ffb800 100%);
  border: none;
  color: #8b4513;
  font-weight: 500;
}

.vip-btn:hover {
  background: linear-gradient(90deg, #ffe033 0%, #ffc933 100%);
  color: #8b4513;
}

/* 积分显示 */
.credits-display {
  color: #ff7a00;
  font-weight: 500;
}

/* 新榜品牌 */
.newrank-brand {
  color: #8c8c8c;
  font-size: 14px;
}
```

#### 3.1.3 样式规范汇总

| 元素 | 规格 | 说明 |
|------|------|------|
| 整体高度 | 48px | 比标准 Ant Design 略矮 |
| 背景色 | `#ffffff` | 纯白 |
| 品牌名 "懒人同城号" | 20px, 600, `#52c41a` | 品牌绿色 |
| 面包屑文字 | 14px, `#595959` | 次要文字色 |
| 功能地图按钮 | 品牌绿底，白字 | Primary 样式 |
| VIP 按钮 | 金色渐变 | 特殊强调 |
| 图标按钮 | 16px, `#595959` | text 类型 |

---

### 3.2 左侧导航菜单 (Sider)

#### 3.2.1 菜单配置

基于原型截图，完整的菜单结构如下：

```tsx
// config/menu.tsx
import React from 'react';
import {
  HomeOutlined,
  SearchOutlined,
  BarChartOutlined,
  VideoCameraOutlined,
  PlaySquareOutlined,
  ShoppingOutlined,
  TagOutlined,
  RocketOutlined,
  StarOutlined,
  ToolOutlined,
  AppstoreOutlined,
  UserOutlined,
  CreditCardOutlined,
} from '@ant-design/icons';

// VIP 标签组件
const VipTag: React.FC = () => (
  <span className="menu-vip-tag">VIP</span>
);

export const menuData = [
  {
    path: '/home',
    name: '首页',
    icon: <HomeOutlined />,
  },
  {
    path: '/discover',
    name: '找视频号',
    icon: <SearchOutlined />,
    children: [
      { path: '/discover/search', name: '视频号搜索' },
      { path: '/discover/dashboard', name: '账号大盘' },
      { path: '/discover/wechat', name: '公众号同名' },
      { path: '/discover/verified', name: '个人认证·万粉' },
      { path: '/discover/trending', name: '暴涨视频号' },
      { path: '/discover/map', name: '地域找号' }, // 当前页面
    ],
  },
  {
    path: '/ranking',
    name: '指数榜单',
    icon: <BarChartOutlined />,
    children: [
      { path: '/ranking/hot', name: '热门榜' },
      { path: '/ranking/rising', name: '上升榜' },
      { path: '/ranking/new', name: '新人榜' },
    ],
  },
  {
    path: '/dynamics',
    name: '视频号动态',
    icon: <VideoCameraOutlined />,
    children: [
      { path: '/dynamics/videos', name: '视频动态' },
      { path: '/dynamics/live', name: '直播动态' },
    ],
  },
  {
    path: '/live',
    name: '视频号直播',
    icon: <PlaySquareOutlined />,
    children: [
      { path: '/live/schedule', name: '直播预告' },
      { path: '/live/replay', name: '直播回放' },
    ],
  },
  {
    path: '/live-products',
    name: '直播商品',
    icon: <ShoppingOutlined />,
    tag: <VipTag />,
    children: [
      { path: '/live-products/list', name: '商品列表' },
      { path: '/live-products/analysis', name: '商品分析' },
    ],
  },
  {
    path: '/brand',
    name: '品牌营销',
    icon: <TagOutlined />,
    tag: <VipTag />,
    children: [
      { path: '/brand/campaigns', name: '营销活动' },
      { path: '/brand/analysis', name: '品牌分析' },
    ],
  },
  {
    path: '/promotion',
    name: '流量推广',
    icon: <RocketOutlined />,
    tag: <VipTag />,
    children: [
      { path: '/promotion/ads', name: '广告投放' },
      { path: '/promotion/boost', name: '流量加速' },
    ],
  },
  {
    path: '/favorites',
    name: '收藏',
    icon: <StarOutlined />,
    children: [
      { path: '/favorites/accounts', name: '收藏账号' },
      { path: '/favorites/videos', name: '收藏视频' },
    ],
  },
  {
    path: '/tools',
    name: '工具',
    icon: <ToolOutlined />,
    children: [
      { path: '/tools/export', name: '数据导出' },
      { path: '/tools/compare', name: '账号对比' },
    ],
  },
  {
    path: '/matrix',
    name: '矩阵管理',
    icon: <AppstoreOutlined />,
    children: [
      { path: '/matrix/accounts', name: '矩阵账号' },
      { path: '/matrix/analysis', name: '矩阵分析' },
    ],
  },
  {
    path: '/profile',
    name: '个人中心',
    icon: <UserOutlined />,
    children: [
      { path: '/profile/info', name: '个人信息' },
      { path: '/profile/settings', name: '账号设置' },
    ],
  },
  {
    path: '/billing',
    name: '购买续费',
    icon: <CreditCardOutlined />,
  },
];
```

#### 3.2.2 菜单类型定义

```typescript
// types/menu.ts
import type { ReactNode } from 'react';

export interface MenuItem {
  path: string;
  name: string;
  icon?: ReactNode;
  tag?: ReactNode;        // VIP 标签等
  children?: MenuItem[];
  hideInMenu?: boolean;
}
```

#### 3.2.3 样式规范

```css
/* styles/sider.css */

/* 侧边栏整体 */
.ant-layout-sider {
  background: #ffffff !important;
  border-right: 1px solid #f0f0f0;
}

/* 菜单项基础样式 */
.ant-menu-item,
.ant-menu-submenu-title {
  height: 40px;
  line-height: 40px;
  margin: 4px 8px !important;
  padding: 0 12px !important;
  border-radius: 4px;
}

/* 菜单项图标 */
.ant-menu-item .anticon,
.ant-menu-submenu-title .anticon {
  font-size: 16px;
  color: #595959;
}

/* 菜单项文字 */
.ant-menu-title-content {
  font-size: 14px;
  color: #262626;
}

/* 父级菜单展开态 - 绿色高亮 */
.ant-menu-submenu-selected > .ant-menu-submenu-title {
  color: #52c41a !important;
  background: rgba(82, 196, 26, 0.08) !important;
}

.ant-menu-submenu-selected > .ant-menu-submenu-title .anticon {
  color: #52c41a !important;
}

/* 子菜单项选中态 - 橙色高亮 */
.ant-menu-item-selected {
  background: linear-gradient(90deg, #fff7e6 0%, transparent 100%) !important;
  border-left: 3px solid #ff7a00 !important;
  margin-left: 5px !important;
}

.ant-menu-item-selected .ant-menu-title-content {
  color: #ff7a00 !important;
  font-weight: 500;
}

/* 悬停态 */
.ant-menu-item:hover,
.ant-menu-submenu-title:hover {
  background: #fafafa !important;
}

/* VIP 标签 */
.menu-vip-tag {
  display: inline-block;
  margin-left: 8px;
  padding: 0 6px;
  font-size: 10px;
  font-weight: 500;
  color: #ff7a00;
  background: linear-gradient(90deg, #fff7e6 0%, #fffbe6 100%);
  border: 1px solid #ffd591;
  border-radius: 2px;
  line-height: 16px;
}

/* 子菜单缩进 */
.ant-menu-inline .ant-menu-item {
  padding-left: 48px !important;
}

/* 展开/收起图标 */
.ant-menu-submenu-arrow {
  color: #bfbfbf;
}

.ant-menu-submenu-open > .ant-menu-submenu-title .ant-menu-submenu-arrow {
  color: #52c41a;
}
```

#### 3.2.4 样式规范汇总

| 状态 | 背景色 | 文字色 | 边框 | 说明 |
|------|--------|--------|------|------|
| 默认 | 透明 | `#262626` | 无 | 普通状态 |
| 悬停 | `#fafafa` | `#262626` | 无 | hover 效果 |
| 父级展开 | `rgba(82,196,26,0.08)` | `#52c41a` | 无 | 绿色主题 |
| 子项选中 | `#fff7e6` 渐变 | `#ff7a00` | 左侧 3px 橙色 | 橙色强调 |
| VIP 标签 | `#fff7e6` 渐变 | `#ff7a00` | 1px `#ffd591` | 特殊标记 |

---

### 3.3 地图展示区域 (Content)

#### 3.3.1 组件结构（悬浮城市筛选）

基于原型截图，城市筛选使用**文字链接**样式（非 Tag），悬浮在地图左上角：

```tsx
// pages/MapView/index.tsx
import React, { useState, useCallback } from 'react';
import { Card, Input, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { AMapComponent } from '@/components/AMap';
import { StarMarker } from '@/components/MapMarker';
import type { VideoAccount } from '@/types';

interface MapViewProps {
  accounts: VideoAccount[];
  loading?: boolean;
  onMarkerClick?: (account: VideoAccount) => void;
  activeAccountId?: string;
}

const hotCities = [
  { code: 'all', name: '全国' },
  { code: 'guangzhou', name: '广州' },
  { code: 'shenzhen', name: '深圳' },
  { code: 'hangzhou', name: '杭州' },
  { code: 'chengdu', name: '成都' },
  { code: 'changsha', name: '长沙' },
  { code: 'zhengzhou', name: '郑州' },
  { code: 'xiamen', name: '厦门' },
  { code: 'suzhou', name: '苏州' },
  { code: 'nanjing', name: '南京' },
];

export const MapView: React.FC<MapViewProps> = ({
  accounts,
  loading,
  onMarkerClick,
  activeAccountId,
}) => {
  const [selectedCity, setSelectedCity] = useState('chengdu'); // 默认成都
  const [searchValue, setSearchValue] = useState('');
  const [mapCenter, setMapCenter] = useState<[number, number]>([104.065735, 30.659462]); // 成都
  const [mapZoom, setMapZoom] = useState(5);

  const handleCityChange = useCallback((cityCode: string) => {
    setSelectedCity(cityCode);
    // 根据城市切换地图中心点
    const cityCoords = getCityCoords(cityCode);
    if (cityCoords) {
      setMapCenter(cityCoords);
      setMapZoom(cityCode === 'all' ? 5 : 10);
    }
  }, []);

  // 获取当前选中城市名称（用于排行榜 Tab）
  const selectedCityName = hotCities.find((c) => c.code === selectedCity)?.name || '全国';

  return (
    <div className="map-container">
      {/* 悬浮城市筛选卡片 */}
      <Card
        bordered={false}
        className="city-filter-card"
        bodyStyle={{ padding: '12px 16px' }}
      >
        <div className="city-filter-header">
          <span className="filter-title">城市列表</span>
          <Input
            placeholder="城市搜索"
            prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
            size="small"
            style={{ width: 100 }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        {/* 城市链接列表（非 Tag，纯文字链接） */}
        <div className="city-links-wrapper">
          {hotCities.map((city) => (
            <a
              key={city.code}
              className={`city-link ${selectedCity === city.code ? 'city-link-active' : ''}`}
              onClick={() => handleCityChange(city.code)}
            >
              {city.name}
            </a>
          ))}
        </div>
        <a className="show-all-cities">全部城市 ▼</a>
      </Card>

      {/* 地图组件 */}
      <Spin spinning={loading} tip="加载中...">
        <div className="map-wrapper">
          <AMapComponent
            center={mapCenter}
            zoom={mapZoom}
            onMoveEnd={(e) => {
              // 地图移动结束回调
            }}
          >
            {accounts.map((account) => (
              <StarMarker
                key={account.id}
                position={[account.location.lng, account.location.lat]}
                isActive={activeAccountId === account.id}
                accountName={account.name}
                onClick={() => onMarkerClick?.(account)}
              />
            ))}
          </AMapComponent>
        </div>
      </Spin>

      {/* 地图控制按钮（右下角） */}
      <div className="map-controls">
        <div className="zoom-controls">
          <button className="zoom-btn" onClick={() => setMapZoom((z) => Math.min(z + 1, 18))}>+</button>
          <button className="zoom-btn" onClick={() => setMapZoom((z) => Math.max(z - 1, 3))}>−</button>
        </div>
      </div>

      {/* 地图版权信息 */}
      <div className="map-attribution">
        <span>高德地图 © 2026 AutoNavi</span>
      </div>
    </div>
  );
};
```

#### 3.3.2 城市筛选卡片样式（文字链接版）

```css
/* styles/map-view.css */
.map-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 48px); /* 减去 Header 高度 */
}

/* 悬浮城市筛选卡片 */
.city-filter-card {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 100;
  width: 280px;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.city-filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.filter-title {
  font-size: 14px;
  font-weight: 500;
  color: #262626;
}

/* 城市链接容器 */
.city-links-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 16px 20px;
  margin-bottom: 8px;
}

/* 城市链接样式（非 Tag） */
.city-link {
  font-size: 14px;
  color: #595959;
  cursor: pointer;
  transition: color 0.2s ease;
  text-decoration: none;
}

.city-link:hover {
  color: #ff7a00;
}

/* 选中态（橙色） */
.city-link-active {
  color: #ff7a00 !important;
  font-weight: 500;
}

/* 全部城市链接 */
.show-all-cities {
  display: inline-block;
  margin-top: 8px;
  font-size: 12px;
  color: #8c8c8c;
  cursor: pointer;
}

.show-all-cities:hover {
  color: #ff7a00;
}

/* 地图容器 */
.map-wrapper {
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 48px);
}

/* 地图控制按钮 */
.map-controls {
  position: absolute;
  right: 16px;
  bottom: 80px;
  z-index: 100;
}

.zoom-controls {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.zoom-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: #ffffff;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.2s ease;
  color: #595959;
}

.zoom-btn:hover {
  background: #f5f5f5;
}

.zoom-btn:first-child {
  border-bottom: 1px solid #f0f0f0;
}

/* 地图版权信息 */
.map-attribution {
  position: absolute;
  left: 16px;
  bottom: 16px;
  z-index: 100;
  font-size: 12px;
  color: #8c8c8c;
}
```

#### 3.3.3 地图标记点（六角星样式）

基于原型界面，使用六角星形 SVG 作为地图标记：

```tsx
// components/MapMarker/StarMarker.tsx
import React from 'react';
import { Tooltip } from 'antd';

interface StarMarkerProps {
  size?: number;
  color?: string;
  isActive?: boolean;
  accountName?: string;
  onClick?: () => void;
}

export const StarMarker: React.FC<StarMarkerProps> = ({
  size = 24,
  color = '#52c41a',
  isActive = false,
  accountName,
  onClick,
}) => (
  <Tooltip title={accountName} placement="top">
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`map-marker ${isActive ? 'map-marker-active' : ''}`}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      {/* 六角星路径 */}
      <path
        d="M12 2L14.09 8.26L20.18 8.26L15.54 12.14L17.63 18.4L12 14.52L6.37 18.4L8.46 12.14L3.82 8.26L9.91 8.26L12 2Z"
        fill={isActive ? '#ff7a00' : color}
        stroke={isActive ? '#ff7a00' : color}
        strokeWidth="0.5"
        filter="url(#marker-shadow)"
      />
      <defs>
        <filter id="marker-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor={color} floodOpacity="0.3"/>
        </filter>
      </defs>
    </svg>
  </Tooltip>
);
```

**标记点样式规范**：

| 状态 | 颜色 | 大小 | 效果 |
|------|------|------|------|
| 默认 | `#52c41a` (品牌绿) | 24px | 带投影 |
| 悬停 | `#73d13d` (浅绿) | 28px (1.17倍) | 投影加深 |
| 选中/激活 | `#ff7a00` (强调橙) | 32px (1.33倍) | 脉冲动画 |
| 聚合点 | `#52c41a` + 数字 | 36px | 显示聚合数量 |

**标记点动效 CSS**：

```css
/* styles/map-marker.css */
.map-marker {
  transition: transform 0.2s ease-out, filter 0.2s ease-out;
  transform-origin: center bottom;
}

.map-marker:hover {
  transform: scale(1.17);
  filter: drop-shadow(0 4px 8px rgba(82, 196, 26, 0.4));
}

.map-marker-active {
  transform: scale(1.33);
  animation: marker-pulse 1.5s ease-in-out infinite;
}

@keyframes marker-pulse {
  0%, 100% {
    filter: drop-shadow(0 0 4px rgba(255, 122, 0, 0.4));
  }
  50% {
    filter: drop-shadow(0 0 12px rgba(255, 122, 0, 0.8));
  }
}
```

**标记点聚合组件**（使用高德地图 MarkerCluster）：

```tsx
// components/MapMarker/MarkerCluster.tsx
import { MarkerCluster } from '@amap/amap-jsapi-react';

<MarkerCluster
  data={markers}
  renderClusterMarker={(context) => (
    <div className="cluster-marker">
      <span className="cluster-count">{context.count}</span>
    </div>
  )}
  styles={[
    { url: '/cluster-small.svg', size: [36, 36], offset: [-18, -18] },
    { url: '/cluster-medium.svg', size: [48, 48], offset: [-24, -24] },
    { url: '/cluster-large.svg', size: [64, 64], offset: [-32, -32] },
  ]}
/>

---

### 3.4 右侧排行榜面板 (Right Panel)

#### 3.4.1 组件结构（使用 Tabs 切换）

基于原型截图，右侧面板使用 `Tabs` 组件，**第一个 Tab 为动态城市名**：

```tsx
// components/RankingPanel/index.tsx
import React, { useState, useMemo } from 'react';
import { Card, Tabs, List, Avatar, Tag, Typography } from 'antd';
import { CheckCircleFilled, PlusCircleOutlined } from '@ant-design/icons';
import type { RankingItem } from '@/types';

const { Text } = Typography;

interface RankingPanelProps {
  selectedCity: string;
  cityName: string;               // 动态城市名，如 "成都"
  onAccountClick?: (account: RankingItem) => void;
  activeAccountId?: string;
  hoveredAccountId?: string;
}

export const RankingPanel: React.FC<RankingPanelProps> = ({
  selectedCity,
  cityName,
  onAccountClick,
  activeAccountId,
  hoveredAccountId,
}) => {
  const [activeTab, setActiveTab] = useState('hot');

  // Tab 配置：第一项为动态城市名
  const tabItems = useMemo(() => [
    {
      key: 'city',
      label: (
        <span className="tab-label">
          <span className="tab-city-dot">●</span>
          {cityName}
        </span>
      ),
      children: <RankingList type="city" city={selectedCity} />,
    },
    {
      key: 'hot',
      label: '热门账号',
      children: <RankingList type="hot" />,
    },
    {
      key: 'org',
      label: '机构账号总',
      children: <RankingList type="org" />,
    },
    {
      key: 'personal',
      label: '个人认证总',
      children: <RankingList type="personal" />,
    },
  ], [cityName, selectedCity]);

  // 当前 Tab 的说明文字
  const tabHint = useMemo(() => {
    switch (activeTab) {
      case 'hot':
        return '热门账号筛30天平均推荐>1000的视频号';
      case 'org':
        return '机构认证账号总榜';
      case 'personal':
        return '个人认证账号总榜';
      case 'city':
        return `${cityName}地区热门账号`;
      default:
        return '';
    }
  }, [activeTab, cityName]);

  return (
    <Card
      bordered={false}
      className="ranking-panel"
      bodyStyle={{ padding: 0 }}
    >
      {/* Tabs 切换 */}
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        className="ranking-tabs"
        tabBarStyle={{
          padding: '0 16px',
          marginBottom: 0,
          borderBottom: '1px solid #f0f0f0',
        }}
      />

      {/* 说明文字 + 表头 */}
      <div className="ranking-header">
        <div className="ranking-hint">{tabHint}</div>
        <div className="ranking-columns">
          <span className="col-account">账号</span>
          <span className="col-recommend">30天平均推荐数</span>
          <span className="col-action">操作</span>
        </div>
      </div>
    </Card>
  );
};
```

#### 3.4.2 排行榜列表项组件

```tsx
// components/RankingPanel/RankingListItem.tsx
import React from 'react';
import { List, Avatar, Tag, Typography } from 'antd';
import { CheckCircleFilled, PlusCircleOutlined } from '@ant-design/icons';
import type { RankingItem } from '@/types';

const { Text } = Typography;

interface RankingListItemProps {
  item: RankingItem;
  rank: number;
  isActive?: boolean;
  isHovered?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const RankingListItem: React.FC<RankingListItemProps> = ({
  item,
  rank,
  isActive,
  isHovered,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => (
  <List.Item
    className={`ranking-item ${isActive ? 'ranking-item-active' : ''} ${isHovered ? 'ranking-item-hovered' : ''}`}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    data-account-id={item.id}
    style={{ cursor: 'pointer' }}
  >
    <div className="ranking-item-content">
      {/* 左侧：头像 */}
      <div className="ranking-avatar-wrapper">
        <Avatar size={48} src={item.avatar} />
      </div>

      {/* 中间：账号信息 */}
      <div className="ranking-info">
        <div className="ranking-name-row">
          <Text strong className="account-name">{item.name}</Text>
          {item.verified && (
            <CheckCircleFilled style={{ color: '#1890ff', marginLeft: 4, fontSize: 12 }} />
          )}
          <Text type="secondary" className="account-category">
            {item.category}
          </Text>
        </div>
        <div className="ranking-tags">
          {item.tags.map((tag) => (
            <Tag key={tag} className="account-tag">
              🏷️ {tag}
            </Tag>
          ))}
        </div>
      </div>

      {/* 右侧：数据 + 操作 */}
      <div className="ranking-stats">
        <Text strong className="stat-number">
          {formatNumber(item.avgRecommend30d)}
        </Text>
        <PlusCircleOutlined className="follow-icon" />
      </div>
    </div>
  </List.Item>
);

// 数字格式化（如 100002 -> 10.0万）
const formatNumber = (num: number): string => {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万';
  }
  return num.toLocaleString();
};
```

#### 3.4.3 面板样式规范

```css
/* styles/ranking-panel.css */
.ranking-panel {
  width: 320px;
  height: 100%;
  min-height: calc(100vh - 48px);
  border-left: 1px solid #f0f0f0;
  background: #ffffff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* Tabs 样式 */
.ranking-tabs {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.ranking-tabs .ant-tabs-nav {
  margin-bottom: 0;
}

.ranking-tabs .ant-tabs-content {
  flex: 1;
  overflow-y: auto;
}

/* Tab 标签样式 */
.ranking-tabs .ant-tabs-tab {
  padding: 12px 8px;
  font-size: 13px;
  color: #595959;
}

.ranking-tabs .ant-tabs-tab-active {
  color: #ff7a00 !important;
}

.ranking-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
  color: #ff7a00 !important;
}

.ranking-tabs .ant-tabs-ink-bar {
  background-color: #ff7a00;
}

/* 城市 Tab 前的圆点 */
.tab-city-dot {
  color: #52c41a;
  margin-right: 4px;
  font-size: 10px;
}

/* 表头区域 */
.ranking-header {
  padding: 8px 16px;
  border-bottom: 1px solid #f0f0f0;
  background: #fafafa;
}

.ranking-hint {
  font-size: 12px;
  color: #8c8c8c;
  margin-bottom: 8px;
}

.ranking-columns {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #8c8c8c;
}

.col-account {
  flex: 1;
}

.col-recommend {
  width: 100px;
  text-align: right;
}

.col-action {
  width: 40px;
  text-align: center;
}

/* 列表项样式 */
.ranking-item {
  padding: 12px 16px !important;
  transition: background-color 0.15s ease;
  border-bottom: 1px solid #f5f5f5;
}

.ranking-item:hover,
.ranking-item-hovered {
  background: linear-gradient(90deg, #fff7e6 0%, transparent 100%);
}

.ranking-item-active {
  background: linear-gradient(90deg, #fff7e6 0%, #fffbe6 50%, transparent 100%) !important;
  border-left: 3px solid #ff7a00;
  padding-left: 13px !important;
}

.ranking-item-content {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 12px;
}

.ranking-avatar-wrapper {
  flex-shrink: 0;
}

.ranking-info {
  flex: 1;
  min-width: 0;
}

.ranking-name-row {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 4px;
}

.account-name {
  font-size: 14px;
  color: #262626;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
}

.account-category {
  font-size: 12px;
  margin-left: 8px;
  flex-shrink: 0;
}

.ranking-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

/* 标签样式 - 黄底橙字 */
.account-tag {
  background: #fffbe6 !important;
  border: 1px solid #ffe58f !important;
  color: #d48806 !important;
  font-size: 11px !important;
  padding: 0 6px !important;
  margin: 0 !important;
  line-height: 18px !important;
}

.ranking-stats {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  flex-shrink: 0;
}

.stat-number {
  font-size: 14px;
  color: #262626;
}

.follow-icon {
  color: #bfbfbf;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.follow-icon:hover {
  color: #ff7a00;
}
```

#### 3.4.4 数据格式（完整字段）

```typescript
// types/ranking.ts
export interface RankingItem {
  id: string;                    // 账号唯一标识
  name: string;                  // 账号名称
  avatar: string;                // 头像 URL
  verified: boolean;             // 是否认证
  verifiedType?: 'personal' | 'org'; // 认证类型
  tags: string[];                // 标签列表（如 "音乐人"、"搞笑博主"）
  category: string;              // 账号分类（如 "音乐"、"搞笑"）
  followers: number;             // 粉丝数
  avgRecommend30d: number;       // 30天平均推荐数（核心指标）
  hotScore: number;              // 热度分数
  location: {                    // 地理位置
    province: string;
    city: string;
    lng: number;                 // 经度
    lat: number;                 // 纬度
  };
  trend?: 'up' | 'down' | 'stable'; // 趋势
  trendValue?: number;           // 趋势变化值
}

// 排行榜响应数据
export interface RankingResponse {
  list: RankingItem[];
  total: number;
  updateTime: string;            // 数据更新时间
}
```

---

### 3.5 骨架屏加载状态

使用 Ant Design `Skeleton` 组件实现优雅的加载体验：

#### 3.5.1 排行榜骨架屏

```tsx
// components/RankingPanel/RankingSkeleton.tsx
import React from 'react';
import { Skeleton, List, Space } from 'antd';

interface RankingSkeletonProps {
  count?: number;
}

export const RankingSkeleton: React.FC<RankingSkeletonProps> = ({ count = 10 }) => (
  <List
    dataSource={Array(count).fill(null)}
    renderItem={() => (
      <List.Item style={{ padding: '12px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: 12 }}>
          {/* 头像骨架 */}
          <Skeleton.Avatar active size={48} />

          {/* 信息骨架 */}
          <div style={{ flex: 1 }}>
            <Skeleton.Input active size="small" style={{ width: 120, marginBottom: 8 }} />
            <Space>
              <Skeleton.Button active size="small" style={{ width: 48, height: 20 }} />
              <Skeleton.Button active size="small" style={{ width: 48, height: 20 }} />
            </Space>
          </div>

          {/* 数据骨架 */}
          <Skeleton.Input active size="small" style={{ width: 60 }} />
        </div>
      </List.Item>
    )}
  />
);
```

#### 3.5.2 城市筛选骨架屏

```tsx
// components/CityFilter/CityFilterSkeleton.tsx
import React from 'react';
import { Card, Skeleton, Space } from 'antd';

export const CityFilterSkeleton: React.FC = () => (
  <Card bordered={false} bodyStyle={{ padding: '12px 16px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
      <Skeleton.Input active size="small" style={{ width: 60 }} />
      <Skeleton.Input active size="small" style={{ width: 100 }} />
    </div>
    <Space size={[8, 8]} wrap>
      {Array(10).fill(null).map((_, i) => (
        <Skeleton.Button key={i} active size="small" style={{ width: 48, height: 28 }} />
      ))}
    </Space>
  </Card>
);
```

#### 3.5.3 加载状态管理

```tsx
// hooks/useLoadingState.ts
import { useState, useCallback } from 'react';

export const useLoadingState = () => {
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});

  const setLoading = useCallback((key: string, loading: boolean) => {
    setLoadingMap((prev) => ({ ...prev, [key]: loading }));
  }, []);

  const isLoading = useCallback((key: string) => loadingMap[key] ?? false, [loadingMap]);

  return { setLoading, isLoading };
};

// 使用示例
const { setLoading, isLoading } = useLoadingState();

// 加载排行榜
setLoading('ranking', true);
const data = await fetchRanking();
setLoading('ranking', false);

// 渲染
{isLoading('ranking') ? <RankingSkeleton /> : <RankingList data={data} />}
```

#### 3.5.4 右侧悬浮工具栏

基于原型截图，页面右侧有固定悬浮的工具栏：

```tsx
// components/FloatingToolbar/index.tsx
import React from 'react';
import { Tooltip } from 'antd';
import {
  AppstoreOutlined,
  CustomerServiceOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

interface ToolbarItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  badge?: string;
}

const toolbarItems: ToolbarItem[] = [
  {
    key: 'matrix',
    icon: <AppstoreOutlined />,
    label: '视频号\n矩阵管理',
  },
  {
    key: 'service',
    icon: <CustomerServiceOutlined />,
    label: '联系\n客服',
  },
  {
    key: 'report',
    icon: <FileTextOutlined />,
    label: '年报',
  },
  {
    key: 'guide',
    icon: <QuestionCircleOutlined />,
    label: '新手',
  },
];

export const FloatingToolbar: React.FC = () => (
  <div className="floating-toolbar">
    {toolbarItems.map((item) => (
      <Tooltip key={item.key} title={item.label.replace('\n', '')} placement="left">
        <div className="toolbar-item" onClick={item.onClick}>
          <span className="toolbar-icon">{item.icon}</span>
          <span className="toolbar-label">{item.label}</span>
        </div>
      </Tooltip>
    ))}
    {/* 收起/展开按钮 */}
    <div className="toolbar-toggle">
      <span>»</span>
    </div>
  </div>
);
```

```css
/* styles/floating-toolbar.css */
.floating-toolbar {
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 4px 0 0 4px;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.toolbar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 56px;
  padding: 12px 8px;
  cursor: pointer;
  transition: background 0.2s ease;
  border-bottom: 1px solid #f0f0f0;
}

.toolbar-item:hover {
  background: #f5f5f5;
}

.toolbar-item:last-of-type {
  border-bottom: none;
}

.toolbar-icon {
  font-size: 20px;
  color: #595959;
  margin-bottom: 4px;
}

.toolbar-item:hover .toolbar-icon {
  color: #52c41a;
}

.toolbar-label {
  font-size: 10px;
  color: #8c8c8c;
  text-align: center;
  line-height: 1.3;
  white-space: pre-line;
}

.toolbar-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 24px;
  background: #fafafa;
  cursor: pointer;
  color: #bfbfbf;
  font-size: 12px;
}

.toolbar-toggle:hover {
  background: #f0f0f0;
  color: #595959;
}
```

---

### 3.6 交互动效规范汇总

#### 3.6.1 通用过渡时间

| 动效类型 | 持续时间 | 缓动函数 | 适用场景 |
|---------|---------|---------|---------|
| 快速反馈 | 0.1s | ease-out | 按钮点击、开关切换 |
| 标准过渡 | 0.2s | ease | hover 效果、状态变化 |
| 中等动画 | 0.3s | ease-in-out | 面板展开、Tab 切换 |
| 慢速动画 | 0.5s | cubic-bezier | 页面过渡、大型组件 |

#### 3.6.2 全局动效变量

```css
/* styles/transitions.css */
:root {
  /* 过渡时间 */
  --transition-fast: 0.1s;
  --transition-normal: 0.2s;
  --transition-slow: 0.3s;

  /* 缓动函数 */
  --ease-out: cubic-bezier(0.215, 0.61, 0.355, 1);
  --ease-in-out: cubic-bezier(0.645, 0.045, 0.355, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);

  /* 组合预设 */
  --transition-hover: all var(--transition-normal) var(--ease-out);
  --transition-active: all var(--transition-fast) ease-out;
  --transition-expand: all var(--transition-slow) var(--ease-in-out);
}
```

#### 3.6.3 组件动效汇总

| 组件 | 触发条件 | 动效描述 | CSS 示例 |
|------|---------|---------|---------|
| 地图标记 | hover | 放大 1.17x + 投影加深 | `transform: scale(1.17)` |
| 地图标记 | 选中 | 放大 1.33x + 脉冲动画 | `animation: marker-pulse 1.5s infinite` |
| 排行榜项 | hover | 渐变背景从左向右 | `background: linear-gradient(...)` |
| 排行榜项 | 选中 | 左边框高亮 + 背景色 | `border-left: 3px solid #ff7a00` |
| 城市标签 | hover | 背景变深 + 边框变化 | `background: #f5f5f5` |
| 城市标签 | 选中 | 橙色主题切换 | `color: #ff7a00` |
| 关注按钮 | hover | 图标变色 + 背景圆 | `color: #ff7a00; background: #fff7e6` |
| Tab 切换 | 点击 | 下划线滑动 | Ant Design 内置 |
| 卡片 | hover | 轻微上浮 + 阴影加深 | `transform: translateY(-2px)` |

---

### 3.7 地图与排行榜联动交互

#### 3.7.1 联动状态管理

```tsx
// hooks/useMapRankingSync.ts
import { useState, useCallback, useEffect } from 'react';
import type { RankingItem } from '@/types';

interface UseMapRankingSyncOptions {
  onAccountSelect?: (account: RankingItem | null) => void;
}

export const useMapRankingSync = (options?: UseMapRankingSyncOptions) => {
  const [activeAccountId, setActiveAccountId] = useState<string | null>(null);
  const [hoveredAccountId, setHoveredAccountId] = useState<string | null>(null);

  // 从地图选中账号
  const handleMapMarkerClick = useCallback((account: RankingItem) => {
    setActiveAccountId(account.id);
    options?.onAccountSelect?.(account);
    // 滚动排行榜到对应项
    scrollRankingToAccount(account.id);
  }, [options]);

  // 从排行榜选中账号
  const handleRankingItemClick = useCallback((account: RankingItem) => {
    setActiveAccountId(account.id);
    options?.onAccountSelect?.(account);
    // 地图飞行到对应位置
    flyToAccount(account);
  }, [options]);

  // 悬停联动
  const handleMapMarkerHover = useCallback((accountId: string | null) => {
    setHoveredAccountId(accountId);
  }, []);

  const handleRankingItemHover = useCallback((accountId: string | null) => {
    setHoveredAccountId(accountId);
  }, []);

  // 清除选中
  const clearSelection = useCallback(() => {
    setActiveAccountId(null);
    setHoveredAccountId(null);
    options?.onAccountSelect?.(null);
  }, [options]);

  return {
    activeAccountId,
    hoveredAccountId,
    handleMapMarkerClick,
    handleRankingItemClick,
    handleMapMarkerHover,
    handleRankingItemHover,
    clearSelection,
  };
};

// 辅助函数：滚动排行榜到指定账号
const scrollRankingToAccount = (accountId: string) => {
  const element = document.querySelector(`[data-account-id="${accountId}"]`);
  element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
};

// 辅助函数：地图飞行到账号位置
const flyToAccount = (account: RankingItem) => {
  // 需要通过 ref 或全局状态访问地图实例
  window.__mapInstance?.flyTo({
    center: [account.location.lng, account.location.lat],
    zoom: 12,
    duration: 800,
  });
};
```

#### 3.7.2 联动交互流程图

```
┌─────────────────────────────────────────────────────────────────┐
│                        用户交互触发                               │
└─────────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              ▼                               ▼
┌─────────────────────────┐     ┌─────────────────────────┐
│     点击地图标记          │     │     点击排行榜项         │
└─────────────────────────┘     └─────────────────────────┘
              │                               │
              ▼                               ▼
┌─────────────────────────┐     ┌─────────────────────────┐
│  设置 activeAccountId    │     │  设置 activeAccountId    │
│  标记变为选中态（橙色）    │     │  列表项高亮（左边框）     │
└─────────────────────────┘     └─────────────────────────┘
              │                               │
              ▼                               ▼
┌─────────────────────────┐     ┌─────────────────────────┐
│  排行榜滚动到对应项        │     │  地图飞行到对应位置       │
│  对应项高亮               │     │  标记变为选中态           │
└─────────────────────────┘     └─────────────────────────┘
              │                               │
              └───────────────┬───────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    显示账号详情弹窗（可选）                        │
└─────────────────────────────────────────────────────────────────┘
```

#### 3.7.3 联动组件整合示例

```tsx
// pages/DiscoverMap/index.tsx
import React from 'react';
import { Row, Col } from 'antd';
import { MapView } from '@/components/MapView';
import { RankingPanel } from '@/components/RankingPanel';
import { useMapRankingSync } from '@/hooks/useMapRankingSync';
import { useAccounts } from '@/hooks/useAccounts';

export const DiscoverMapPage: React.FC = () => {
  const { accounts, loading } = useAccounts();
  const {
    activeAccountId,
    hoveredAccountId,
    handleMapMarkerClick,
    handleRankingItemClick,
    handleMapMarkerHover,
    handleRankingItemHover,
  } = useMapRankingSync();

  return (
    <Row style={{ height: '100%' }}>
      {/* 地图区域 */}
      <Col flex="1">
        <MapView
          accounts={accounts}
          loading={loading}
          activeAccountId={activeAccountId}
          hoveredAccountId={hoveredAccountId}
          onMarkerClick={handleMapMarkerClick}
          onMarkerHover={handleMapMarkerHover}
        />
      </Col>

      {/* 排行榜面板 */}
      <Col flex="320px">
        <RankingPanel
          accounts={accounts}
          activeAccountId={activeAccountId}
          hoveredAccountId={hoveredAccountId}
          onItemClick={handleRankingItemClick}
          onItemHover={handleRankingItemHover}
        />
      </Col>
    </Row>
  );
};
```

---

## 4. 响应式设计

### 4.1 断点定义
遵循 Ant Design 响应式断点：

| 断点 | 屏幕宽度 | 布局调整 |
|------|---------|---------|
| xs | < 576px | 隐藏侧边栏和右侧面板，仅显示地图 |
| sm | ≥ 576px | 侧边栏折叠，右侧面板移至底部 |
| md | ≥ 768px | 侧边栏折叠，右侧面板固定 |
| lg | ≥ 992px | 侧边栏展开，右侧面板固定 |
| xl | ≥ 1200px | 标准三栏布局 |
| xxl | ≥ 1600px | 标准三栏布局，内容区域居中 |

### 4.2 移动端适配
```tsx
<ProLayout
  layout="mix"
  breakpoint="lg"
  collapsed={collapsed}
  onCollapse={setCollapsed}
  // 移动端自动折叠侧边栏
  collapsedButtonRender={false}
>
  {/* 内容区域 */}
</ProLayout>
```

---

## 5. 主题配置

### 5.1 色彩系统（品牌定制）

基于 1.3 节定义的品牌色彩系统，覆盖 Ant Design 默认主题：

```typescript
// config/theme.ts
import { brandColors } from './brandColors';

export const theme = {
  token: {
    // 主色系 - 使用品牌绿
    colorPrimary: brandColors.primary,        // #52c41a 品牌绿
    colorPrimaryHover: brandColors.primaryHover,
    colorPrimaryActive: brandColors.primaryActive,

    // 功能色
    colorSuccess: brandColors.primary,        // #52c41a 成功色（与主色一致）
    colorWarning: '#faad14',                  // 警告色
    colorError: '#ff4d4f',                    // 错误色
    colorInfo: '#1890ff',                     // 信息色

    // 文字色
    colorTextBase: brandColors.textPrimary,   // #262626
    colorTextSecondary: brandColors.textSecondary,

    // 背景色
    colorBgBase: '#ffffff',
    colorBgLayout: brandColors.bodyBg,        // #f0f2f5

    // 边框
    colorBorder: brandColors.borderBase,      // #d9d9d9
    colorBorderSecondary: brandColors.borderLight,

    // 圆角与字号
    borderRadius: 2,
    fontSize: 14,
  },

  components: {
    // 布局组件
    Layout: {
      headerBg: brandColors.headerBg,         // #ffffff
      siderBg: brandColors.siderBg,           // #001529
      bodyBg: brandColors.bodyBg,             // #f0f2f5
    },

    // 菜单组件
    Menu: {
      itemSelectedBg: 'rgba(82, 196, 26, 0.1)',  // 品牌绿 10% 透明度
      itemSelectedColor: brandColors.primary,
      itemHoverBg: 'rgba(82, 196, 26, 0.06)',
    },

    // Tabs 组件 - 使用强调橙
    Tabs: {
      inkBarColor: brandColors.accent,        // #ff7a00
      itemActiveColor: brandColors.accent,
      itemHoverColor: brandColors.accentHover,
      itemSelectedColor: brandColors.accent,
    },

    // 标签组件
    Tag: {
      defaultBg: '#fafafa',
      defaultColor: brandColors.textSecondary,
    },

    // 卡片组件
    Card: {
      headerBg: 'transparent',
      colorBgContainer: brandColors.cardBg,
    },

    // 列表组件
    List: {
      itemPadding: '12px 16px',
    },

    // 按钮组件
    Button: {
      primaryColor: '#ffffff',
      defaultBorderColor: brandColors.borderBase,
    },
  },
};

// 强调色扩展（用于选中态等特殊场景）
export const accentTheme = {
  colorAccent: brandColors.accent,            // #ff7a00
  colorAccentHover: brandColors.accentHover,
  colorAccentBg: brandColors.accentLight,     // #fff7e6
};
```

### 5.2 CSS 变量注入

```css
/* styles/theme-variables.css */
:root {
  /* 品牌色 */
  --brand-primary: #52c41a;
  --brand-primary-hover: #73d13d;
  --brand-primary-active: #389e0d;

  /* 强调色 */
  --brand-accent: #ff7a00;
  --brand-accent-hover: #ff9633;
  --brand-accent-light: #fff7e6;

  /* 中性色 */
  --color-text-primary: #262626;
  --color-text-secondary: #8c8c8c;
  --color-text-disabled: #bfbfbf;

  /* 背景色 */
  --color-bg-base: #ffffff;
  --color-bg-layout: #f0f2f5;
  --color-bg-card: #ffffff;

  /* 边框色 */
  --color-border-base: #d9d9d9;
  --color-border-light: #f0f0f0;

  /* 排名色 */
  --rank-gold: #faad14;
  --rank-silver: #a0a0a0;
  --rank-bronze: #d48806;
}
```

### 5.3 暗色模式支持

```tsx
// app.tsx
import { ConfigProvider, theme as antdTheme } from 'antd';
import { theme, accentTheme } from '@/config/theme';

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        ...theme,
        // 暗色模式下调整部分颜色
        ...(isDark && {
          token: {
            ...theme.token,
            colorBgBase: '#141414',
            colorBgLayout: '#1f1f1f',
            colorTextBase: '#ffffff',
          },
        }),
      }}
    >
      <App />
    </ConfigProvider>
  );
};
```

---

## 6. 数据流设计

### 6.1 状态管理
```typescript
// models/map.ts
export default {
  namespace: 'map',
  state: {
    selectedCity: 'all',
    mapCenter: [116.397428, 39.90923],
    mapZoom: 5,
    markers: [],
    loading: false,
  },
  effects: {
    *fetchMarkers({ payload }, { call, put }) {
      yield put({ type: 'updateLoading', payload: true });
      const response = yield call(getVideoAccounts, payload);
      yield put({ type: 'updateMarkers', payload: response.data });
      yield put({ type: 'updateLoading', payload: false });
    },
  },
  reducers: {
    updateCity(state, { payload }) {
      return { ...state, selectedCity: payload };
    },
    updateMarkers(state, { payload }) {
      return { ...state, markers: payload };
    },
    updateLoading(state, { payload }) {
      return { ...state, loading: payload };
    },
  },
};
```

### 6.2 API 接口
```typescript
// services/api.ts
export async function getVideoAccounts(params: {
  city?: string;
  category?: string;
  page?: number;
  pageSize?: number;
}) {
  return request('/api/video-accounts', {
    method: 'GET',
    params,
  });
}

export async function getRanking(type: 'hot' | 'rising' | 'new') {
  return request(`/api/ranking/${type}`, {
    method: 'GET',
  });
}
```

---

## 7. 性能优化

### 7.1 地图优化
- 使用虚拟化渲染大量标记点 (> 1000 个)
- 实现标记点聚合 (Marker Clustering)
- 懒加载地图瓦片
- 防抖处理地图移动事件

### 7.2 列表优化
- 使用 `List` 组件的虚拟滚动 (`virtual` 属性)
- 分页加载排行榜数据
- 图片懒加载 (`react-lazy-load-image-component`)

### 7.3 代码分割
```tsx
// 路由级别代码分割
const MapView = lazy(() => import('@/pages/MapView'));
const RankingView = lazy(() => import('@/pages/RankingView'));

<Suspense fallback={<PageLoading />}>
  <Routes>
    <Route path="/map" element={<MapView />} />
    <Route path="/ranking" element={<RankingView />} />
  </Routes>
</Suspense>
```

---

## 8. 实施计划

### 8.1 开发阶段

#### Phase 1: 基础框架搭建 (2-3 天)
- [ ] 初始化 Ant Design Pro 项目
- [ ] 配置 ProLayout 三栏布局
- [ ] 实现顶部导航栏
- [ ] 实现左侧菜单导航
- [ ] 配置路由系统

#### Phase 2: 地图功能开发 (3-4 天)
- [ ] 集成高德地图 SDK
- [ ] 实现城市筛选标签
- [ ] 实现标记点渲染
- [ ] 实现标记点交互 (点击、悬停)
- [ ] 实现地图控制 (缩放、平移)

#### Phase 3: 排行榜开发 (2-3 天)
- [ ] 实现排行榜列表组件
- [ ] 实现用户信息卡片
- [ ] 实现排行榜切换
- [ ] 对接后端 API

#### Phase 4: 数据联动与优化 (2-3 天)
- [ ] 实现地图与排行榜联动
- [ ] 实现搜索功能
- [ ] 性能优化 (虚拟化、懒加载)
- [ ] 响应式适配

#### Phase 5: 测试与发布 (2 天)
- [ ] 单元测试
- [ ] E2E 测试
- [ ] 浏览器兼容性测试
- [ ] 性能测试
- [ ] 部署上线

### 8.2 技术风险
| 风险项 | 影响 | 缓解措施 |
|-------|------|---------|
| 地图性能问题 | 高 | 使用标记点聚合、虚拟化渲染 |
| 数据量过大 | 中 | 分页加载、懒加载 |
| 浏览器兼容性 | 中 | Polyfill、降级方案 |
| 移动端适配 | 低 | 响应式设计、触摸优化 |

---

## 9. 设计规范检查清单

### 9.1 Ant Design Pro 规范遵循
- [ ] 使用 ProLayout 作为页面布局基础
- [ ] 所有组件使用 Ant Design 官方组件
- [ ] 遵循 Ant Design 色彩系统
- [ ] 遵循 Ant Design 字体规范 (PingFang SC / Microsoft YaHei)
- [ ] 遵循 Ant Design 间距规范 (8px 栅格系统)
- [ ] 遵循 Ant Design 圆角规范 (2px 基础圆角)

### 9.2 交互规范
- [ ] 所有可点击元素有明确的悬停态
- [ ] 所有表单输入有验证反馈
- [ ] 所有异步操作有 Loading 状态
- [ ] 所有错误有友好的提示信息
- [ ] 所有操作有确认机制 (删除、退出等)

### 9.3 无障碍规范
- [ ] 所有图片有 alt 属性
- [ ] 所有表单有 label 标签
- [ ] 键盘可访问所有交互元素
- [ ] 色彩对比度符合 WCAG AA 标准
- [ ] 支持屏幕阅读器

---

## 10. 附录

### 10.1 参考资源
- [Ant Design Pro 官方文档](https://pro.ant.design/)
- [Ant Design 设计规范](https://ant.design/docs/spec/introduce-cn)
- [高德地图 JavaScript API](https://lbs.amap.com/api/javascript-api/summary)
- [React 性能优化指南](https://react.dev/learn/render-and-commit)

### 10.2 设计交付物
- [ ] 设计规范文档 (本文档)
- [ ] 组件库 Storybook
- [ ] 交互原型 (Figma/Sketch)
- [ ] 视觉设计稿
- [ ] 切图资源包

### 10.3 联系方式
- **产品负责人**: [待填写]
- **设计负责人**: [待填写]
- **技术负责人**: [待填写]

---

**文档版本**: v1.2
**创建日期**: 2026-01-20
**最后更新**: 2026-01-20
**维护者**: AI Assistant (Claude)

---

## 更新日志

### v1.2 (2026-01-20)
**基于原型截图二次校准**

- ✅ **更新 3.1 顶部导航栏**：
  - 品牌名改为 "懒人同城号"（绿色）
  - Header 高度改为 48px
  - 新增面包屑、功能地图按钮、设备图标组、VIP 按钮（金色渐变）
- ✅ **更新 3.2 左侧菜单**：
  - 补充完整菜单结构（13 个一级菜单）
  - 新增 VIP 标签组件（直播商品、品牌营销、流量推广）
  - 父级展开态改为绿色，子项选中态改为橙色
- ✅ **更新 3.3 城市筛选**：
  - `Tag.CheckableTag` 改为**纯文字链接**样式
  - 选中态仅变色（橙色），无背景/边框
  - 新增地图版权信息组件
- ✅ **更新 3.4 排行榜面板**：
  - 第一个 Tab 改为**动态城市名**（带绿色圆点前缀）
  - 新增表头说明文字（如 "热门账号筛30天平均推荐>1000的视频号"）
  - 新增列标题行（账号 | 30天平均推荐数 | 操作）
  - 新增 `isHovered` 状态支持悬停联动
- ✅ **新增 3.5.4 右侧悬浮工具栏**：
  - 固定在页面右侧中央
  - 包含：视频号矩阵管理、联系客服、年报、新手
  - 支持收起/展开

### v1.1 (2026-01-20)
**基于原型界面评审后的修订**

- ✅ **新增 1.3 品牌色彩系统**：提炼绿色（#52c41a）+ 橙色（#ff7a00）双主题色
- ✅ **更新 3.3 地图区域**：城市筛选面板改为悬浮定位（绝对定位在地图左上角）
- ✅ **更新 3.3.3 地图标记**：圆形改为六角星 SVG，增加悬停/选中动效
- ✅ **更新 3.4 排行榜面板**：Select 下拉改为 Tabs 切换（城市/热门账号/机构/个人认证）
- ✅ **更新 3.4.4 数据格式**：新增 `avgRecommend30d`、`category`、`location` 等字段
- ✅ **新增 3.5 骨架屏加载状态**：排行榜、城市筛选的 Skeleton 组件
- ✅ **新增 3.6 交互动效规范**：统一过渡时间、缓动函数、组件动效汇总表
- ✅ **新增 3.7 地图与排行榜联动**：双向点击/悬停联动、状态管理 Hook、流程图
- ✅ **更新 5.1 主题配置**：使用品牌色覆盖 Ant Design 默认主题
- ✅ **新增 5.2 CSS 变量**：全局 CSS 变量注入方案

### v1.0 (2026-01-20)
- 初始版本，基于 Ant Design Pro 的三栏布局设计规范
