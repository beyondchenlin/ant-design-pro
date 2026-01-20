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
import type { MenuItem } from '@/types/menu';

/**
 * VIP 标签组件
 * 金色渐变，营造尊贵感
 */
const VipTag: React.FC = () => (
  <span className="menu-vip-tag">VIP</span>
);

/**
 * 懒人同城号菜单配置
 * Neo-Chinese Tech Luxury Aesthetic
 *
 * 设计理念：
 * - 13 个一级菜单，层次清晰
 * - VIP 功能用金色标签标识，营造尊贵感
 * - 图标统一 16px，保持视觉节奏
 */
export const menuData: MenuItem[] = [
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
