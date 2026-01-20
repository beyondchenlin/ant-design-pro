/**
 * 新视品牌色彩系统
 * Neo-Chinese Tech Luxury Aesthetic
 *
 * 设计理念：
 * - 绿色（#52c41a）象征生长与机遇，如春天的新芽
 * - 橙色（#ff7a00）象征成就与收获，如秋天的果实
 * - 色彩过渡呼应中国传统的四季轮回哲学
 */

export const brandColors = {
  // 主色系 - 玉绿色（Jade Green）
  primary: '#52c41a',
  primaryHover: '#73d13d',
  primaryActive: '#389e0d',
  primaryLight: 'rgba(82, 196, 26, 0.08)',
  primaryGlow: 'rgba(82, 196, 26, 0.3)',

  // 强调色系 - 琥珀橙（Amber Orange）
  accent: '#ff7a00',
  accentHover: '#ff9633',
  accentActive: '#e66d00',
  accentLight: '#fff7e6',
  accentGlow: 'rgba(255, 122, 0, 0.3)',

  // 中性色系 - 水墨灰（Ink Wash）
  siderBg: '#001529',
  siderBgLight: '#ffffff',
  headerBg: '#ffffff',
  bodyBg: '#f0f2f5',
  cardBg: '#ffffff',

  // 文字色系 - 墨色层次
  textPrimary: '#262626',
  textSecondary: '#8c8c8c',
  textTertiary: '#bfbfbf',
  textDisabled: '#d9d9d9',
  textInverse: '#ffffff',

  // 边框色系 - 细腻分隔
  borderBase: '#d9d9d9',
  borderLight: '#f0f0f0',
  borderDark: '#434343',

  // 排名色系 - 传统金属色
  rankGold: '#faad14',      // 金
  rankSilver: '#a0a0a0',    // 银
  rankBronze: '#d48806',    // 铜

  // 功能色系
  success: '#52c41a',
  warning: '#faad14',
  error: '#ff4d4f',
  info: '#1890ff',

  // 特殊效果色
  shadowLight: 'rgba(0, 0, 0, 0.04)',
  shadowMedium: 'rgba(0, 0, 0, 0.08)',
  shadowHeavy: 'rgba(0, 0, 0, 0.15)',
  overlayLight: 'rgba(0, 0, 0, 0.25)',
  overlayMedium: 'rgba(0, 0, 0, 0.45)',
  overlayHeavy: 'rgba(0, 0, 0, 0.65)',

  // VIP 专属色 - 金色渐变
  vipGradientStart: '#ffd700',
  vipGradientEnd: '#ffb800',
  vipText: '#8b4513',
} as const;

export type BrandColor = keyof typeof brandColors;
