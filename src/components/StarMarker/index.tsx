import React from 'react';
import { Tooltip } from 'antd';
import './index.css';

interface StarMarkerProps {
  size?: number;
  color?: string;
  isActive?: boolean;
  isHovered?: boolean;
  accountName?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

/**
 * 六角星地图标记组件
 * Neo-Chinese Tech Luxury Aesthetic
 *
 * 设计理念：
 * - 六角星源自中国传统吉祥符号，象征好运与成功
 * - 默认玉绿色代表生长机遇
 * - 选中琥珀橙代表收获成就
 * - 脉冲动画呼应能量流动
 */
export const StarMarker: React.FC<StarMarkerProps> = ({
  size = 24,
  color = '#52c41a',
  isActive = false,
  isHovered = false,
  accountName,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const markerColor = isActive ? '#ff7a00' : color;
  const markerSize = isActive ? size * 1.33 : isHovered ? size * 1.17 : size;

  return (
    <Tooltip title={accountName} placement="top">
      <div
        className={`star-marker-wrapper ${isActive ? 'star-marker-active' : ''} ${
          isHovered ? 'star-marker-hovered' : ''
        }`}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{
          width: markerSize,
          height: markerSize,
        }}
      >
        <svg
          width={markerSize}
          height={markerSize}
          viewBox="0 0 24 24"
          className="star-marker-svg"
        >
          <defs>
            {/* 发光滤镜 */}
            <filter id={`glow-${isActive ? 'active' : 'default'}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation={isActive ? '3' : '2'} result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* 渐变填充 */}
            <linearGradient id={`gradient-${isActive ? 'active' : 'default'}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={markerColor} stopOpacity="1" />
              <stop offset="100%" stopColor={markerColor} stopOpacity="0.8" />
            </linearGradient>

            {/* 内部高光 */}
            <radialGradient id="highlight" cx="30%" cy="30%" r="50%">
              <stop offset="0%" stopColor="white" stopOpacity="0.4" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* 外部光晕（仅激活态） */}
          {isActive && (
            <circle
              cx="12"
              cy="12"
              r="10"
              fill={markerColor}
              opacity="0.2"
              className="star-marker-glow"
            />
          )}

          {/* 六角星主体 */}
          <path
            d="M12 2L14.09 8.26L20.18 8.26L15.54 12.14L17.63 18.4L12 14.52L6.37 18.4L8.46 12.14L3.82 8.26L9.91 8.26L12 2Z"
            fill={`url(#gradient-${isActive ? 'active' : 'default'})`}
            stroke={markerColor}
            strokeWidth="0.5"
            filter={`url(#glow-${isActive ? 'active' : 'default'})`}
            className="star-marker-path"
          />

          {/* 内部高光 */}
          <path
            d="M12 2L14.09 8.26L20.18 8.26L15.54 12.14L17.63 18.4L12 14.52L6.37 18.4L8.46 12.14L3.82 8.26L9.91 8.26L12 2Z"
            fill="url(#highlight)"
            opacity="0.6"
          />

          {/* 中心点（仅激活态） */}
          {isActive && (
            <circle
              cx="12"
              cy="12"
              r="2"
              fill="white"
              opacity="0.8"
              className="star-marker-center"
            />
          )}
        </svg>
      </div>
    </Tooltip>
  );
};
