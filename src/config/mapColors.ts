/**
 * 地图配色系统
 * Neo-Chinese Tech Luxury Aesthetic
 *
 * 设计理念：
 * - 玉绿色（#52c41a）象征生长与机遇 - 用于普通节点、省份边界
 * - 琥珀橙（#ff7a00）象征成就与收获 - 用于选中/高亮状态
 * - 深邃夜空蓝背景 - 营造科技感与空间感
 */

import { brandColors } from './brandColors';

export const mapColors = {
  // 主色系 - 玉绿色（象征生长与机遇）
  primary: {
    base: brandColors.primary,           // #52c41a
    light: brandColors.primaryHover,     // #73d13d
    dark: brandColors.primaryActive,     // #389e0d
    glow: 'rgba(82, 196, 26, 0.6)',
    surface: 'rgba(82, 196, 26, 0.08)',
  },

  // 强调色 - 琥珀橙（象征收获与成就）
  accent: {
    base: brandColors.accent,            // #ff7a00
    light: brandColors.accentHover,      // #ff9633
    dark: brandColors.accentActive,      // #e66d00
    glow: 'rgba(255, 122, 0, 0.6)',
    surface: brandColors.accentLight,    // #fff7e6
  },

  // 地图专用色
  map: {
    // 背景 - 深邃夜空蓝
    background: '#0f1629',
    backgroundGradient: 'linear-gradient(135deg, #0a0f1f 0%, #1a2332 50%, #0f1629 100%)',

    // 边框
    border: brandColors.primary,
    borderGlow: 'rgba(82, 196, 26, 0.4)',

    // 陆地
    landFill: '#1a2332',
    landBorder: 'rgba(82, 196, 26, 0.6)',

    // 省份高亮
    provinceHover: 'rgba(82, 196, 26, 0.15)',
    provinceSelected: 'rgba(255, 122, 0, 0.15)',
  },

  // 节点色系
  nodes: {
    // 中心节点（琥珀橙）
    center: brandColors.accent,
    centerGlow: 'rgba(255, 122, 0, 0.8)',

    // 普通节点（玉绿色）
    normal: brandColors.primary,
    normalGlow: 'rgba(82, 196, 26, 0.6)',

    // 悬停态
    hover: brandColors.primaryHover,
    hoverGlow: 'rgba(115, 209, 61, 0.7)',

    // 选中态
    selected: brandColors.accent,
    selectedGlow: 'rgba(255, 122, 0, 0.8)',
  },

  // 飞线色系
  flylines: {
    line: 'rgba(82, 196, 26, 0.6)',
    arrow: brandColors.accent,
    trail: 'rgba(82, 196, 26, 0.3)',
  },

  // 文字色系
  text: {
    primary: '#ffffff',
    secondary: 'rgba(255, 255, 255, 0.85)',
    tertiary: 'rgba(255, 255, 255, 0.65)',
    accent: brandColors.primary,
    highlight: brandColors.accent,
  },

  // 工具提示
  tooltip: {
    background: 'rgba(15, 22, 41, 0.95)',
    border: brandColors.primary,
    shadow: 'rgba(82, 196, 26, 0.2)',
  },

  // 图例
  legend: {
    background: 'rgba(15, 22, 41, 0.95)',
    border: 'rgba(82, 196, 26, 0.3)',
    dotPrimary: brandColors.primary,
    dotAccent: brandColors.accent,
  },
} as const;

// 六角星 SVG 路径 - 用于地图标记点
export const STAR_MARKER_PATH = 'M12 2L14.09 8.26L20.18 8.26L15.54 12.14L17.63 18.4L12 14.52L6.37 18.4L8.46 12.14L3.82 8.26L9.91 8.26L12 2Z';

// 地图标记尺寸
export const MARKER_SIZES = {
  normal: 16,
  hover: 20,
  selected: 24,
  active: 20,
} as const;

// 涟漪效果配置
export const RIPPLE_CONFIG = {
  brushType: 'stroke' as const,
  scale: 3,
  period: 4,
};

// 动画配置
export const MAP_ANIMATION = {
  duration: 800,
  easing: 'cubicOut',
};

export type MapColors = typeof mapColors;
