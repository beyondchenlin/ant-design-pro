import { brandColors } from './brandColors';

/**
 * 新视主题配置
 * 基于 Ant Design 5.x Token System
 *
 * 设计特色：
 * - 使用 Noto Serif SC（思源宋体）作为标题字体，增添文化底蕴
 * - 使用 Inter 作为数据字体，保证清晰度
 * - 微妙的阴影和圆角营造精致感
 */

export const theme = {
  token: {
    // 色彩系统
    colorPrimary: brandColors.primary,
    colorSuccess: brandColors.success,
    colorWarning: brandColors.warning,
    colorError: brandColors.error,
    colorInfo: brandColors.info,

    // 文字色彩
    colorTextBase: brandColors.textPrimary,
    colorTextSecondary: brandColors.textSecondary,
    colorTextTertiary: brandColors.textTertiary,
    colorTextQuaternary: brandColors.textDisabled,

    // 背景色彩
    colorBgBase: '#ffffff',
    colorBgLayout: brandColors.bodyBg,
    colorBgContainer: brandColors.cardBg,
    colorBgElevated: '#ffffff',

    // 边框
    colorBorder: brandColors.borderBase,
    colorBorderSecondary: brandColors.borderLight,

    // 字体家族 - Neo-Chinese Typography
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif`,
    fontFamilyCode: `'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace`,

    // 字号系统
    fontSize: 14,
    fontSizeHeading1: 38,
    fontSizeHeading2: 30,
    fontSizeHeading3: 24,
    fontSizeHeading4: 20,
    fontSizeHeading5: 16,

    // 行高
    lineHeight: 1.5715,
    lineHeightHeading1: 1.21,
    lineHeightHeading2: 1.27,
    lineHeightHeading3: 1.33,
    lineHeightHeading4: 1.4,
    lineHeightHeading5: 1.5,

    // 圆角 - 精致而不过度
    borderRadius: 4,
    borderRadiusLG: 8,
    borderRadiusSM: 2,
    borderRadiusXS: 2,

    // 阴影 - 层次感
    boxShadow: `0 2px 8px ${brandColors.shadowLight}`,
    boxShadowSecondary: `0 4px 12px ${brandColors.shadowMedium}`,
    boxShadowTertiary: `0 6px 16px ${brandColors.shadowHeavy}`,

    // 动画时长
    motionDurationFast: '0.1s',
    motionDurationMid: '0.2s',
    motionDurationSlow: '0.3s',

    // 动画曲线
    motionEaseInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    motionEaseOut: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    motionEaseIn: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',

    // 控件高度
    controlHeight: 32,
    controlHeightLG: 40,
    controlHeightSM: 24,
  },

  components: {
    // 布局组件
    Layout: {
      headerBg: brandColors.headerBg,
      headerHeight: 48,
      headerPadding: '0 16px',
      siderBg: brandColors.siderBgLight,
      bodyBg: brandColors.bodyBg,
      footerBg: brandColors.cardBg,
      footerPadding: '24px 50px',
      triggerBg: brandColors.primary,
      triggerColor: brandColors.textInverse,
      zeroTriggerWidth: 36,
      zeroTriggerHeight: 42,
    },

    // 菜单组件 - 精致的选中态
    Menu: {
      itemBg: 'transparent',
      itemColor: brandColors.textPrimary,
      itemHoverBg: '#fafafa',
      itemHoverColor: brandColors.textPrimary,
      itemSelectedBg: brandColors.primaryLight,
      itemSelectedColor: brandColors.primary,
      itemActiveBg: brandColors.primaryLight,
      subMenuItemBg: 'transparent',
      itemMarginInline: 8,
      itemBorderRadius: 4,
      itemHeight: 40,
      iconSize: 16,
      iconMarginInlineEnd: 10,
      collapsedIconSize: 16,
      collapsedWidth: 64,
    },

    // Tabs 组件 - 橙色强调
    Tabs: {
      inkBarColor: brandColors.accent,
      itemActiveColor: brandColors.accent,
      itemHoverColor: brandColors.accentHover,
      itemSelectedColor: brandColors.accent,
      titleFontSize: 13,
      cardBg: brandColors.cardBg,
      cardHeight: 40,
      horizontalItemPadding: '12px 8px',
      horizontalItemMargin: '0 0 0 0',
    },

    // 卡片组件 - 精致阴影
    Card: {
      headerBg: 'transparent',
      headerFontSize: 16,
      headerFontSizeSM: 14,
      headerHeight: 48,
      headerHeightSM: 36,
      actionsBg: brandColors.bodyBg,
      boxShadow: `0 2px 8px ${brandColors.shadowLight}`,
      boxShadowHover: `0 4px 12px ${brandColors.shadowMedium}`,
    },

    // 按钮组件
    Button: {
      primaryColor: brandColors.textInverse,
      primaryShadow: `0 2px 0 ${brandColors.primaryGlow}`,
      dangerShadow: `0 2px 0 rgba(255, 77, 79, 0.1)`,
      defaultBorderColor: brandColors.borderBase,
      defaultColor: brandColors.textPrimary,
      defaultBg: brandColors.cardBg,
      defaultShadow: `0 2px 0 ${brandColors.shadowLight}`,
      ghostBg: 'transparent',
      ghostColor: brandColors.textPrimary,
      textHoverBg: 'rgba(0, 0, 0, 0.06)',
      linkHoverBg: 'transparent',
      borderRadius: 4,
      borderRadiusLG: 4,
      borderRadiusSM: 4,
      controlHeight: 32,
      controlHeightLG: 40,
      controlHeightSM: 24,
      paddingContentHorizontal: 15,
    },

    // 标签组件 - 黄底橙字
    Tag: {
      defaultBg: '#fafafa',
      defaultColor: brandColors.textSecondary,
      borderRadiusSM: 2,
      fontSizeSM: 11,
      lineHeightSM: 18,
    },

    // 列表组件
    List: {
      itemPadding: '12px 16px',
      itemPaddingSM: '8px 12px',
      itemPaddingLG: '16px 24px',
      metaMarginBottom: 4,
      avatarMarginRight: 12,
      titleMarginBottom: 4,
      descriptionFontSize: 12,
    },

    // 输入框组件
    Input: {
      activeBorderColor: brandColors.primary,
      hoverBorderColor: brandColors.primaryHover,
      activeShadow: `0 0 0 2px ${brandColors.primaryLight}`,
      errorActiveShadow: `0 0 0 2px rgba(255, 77, 79, 0.1)`,
      warningActiveShadow: `0 0 0 2px rgba(250, 173, 20, 0.1)`,
      paddingBlock: 4,
      paddingInline: 11,
    },

    // 工具提示
    Tooltip: {
      colorBgSpotlight: 'rgba(0, 0, 0, 0.85)',
      borderRadius: 4,
    },

    // 徽章
    Badge: {
      indicatorHeight: 20,
      indicatorHeightSM: 16,
      dotSize: 6,
      textFontSize: 12,
      textFontSizeSM: 12,
      textFontWeight: 'normal',
      statusSize: 6,
    },

    // 头像
    Avatar: {
      containerSize: 32,
      containerSizeLG: 48,
      containerSizeSM: 24,
      textFontSize: 14,
      textFontSizeLG: 20,
      textFontSizeSM: 12,
      groupSpace: 4,
      groupOverlapping: -8,
      groupBorderColor: brandColors.cardBg,
    },
  },
};

// 强调色主题扩展（用于特殊场景）
export const accentTheme = {
  token: {
    colorPrimary: brandColors.accent,
    colorPrimaryHover: brandColors.accentHover,
    colorPrimaryActive: brandColors.accentActive,
    colorPrimaryBg: brandColors.accentLight,
  },
};

// VIP 主题扩展
export const vipTheme = {
  token: {
    colorPrimary: brandColors.vipGradientStart,
    colorPrimaryHover: brandColors.vipGradientEnd,
    colorText: brandColors.vipText,
  },
};
