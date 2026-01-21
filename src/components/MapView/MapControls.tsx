/**
 * MapControls 组件
 * 地图控制按钮（缩放、重置）
 * Neo-Chinese Tech Luxury Aesthetic
 *
 * 设计元素：
 * - 玉石质感按钮
 * - 悬浮光晕效果
 * - 优雅的过渡动画
 */

import React from 'react';
import { Button, Tooltip } from 'antd';
import { PlusOutlined, MinusOutlined, AimOutlined } from '@ant-design/icons';
import type { MapControlsProps } from '@/types/map';
import { mapColors } from '@/config/mapColors';

/**
 * MapControls 组件
 */
export const MapControls: React.FC<MapControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onReset,
}) => {
  const buttonStyle: React.CSSProperties = {
    width: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(145deg, rgba(26, 35, 50, 0.9), rgba(15, 22, 41, 0.95))',
    border: `1px solid rgba(82, 196, 26, 0.3)`,
    color: mapColors.text.secondary,
    borderRadius: '12px',
    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: `
      0 4px 12px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.05)
    `,
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* 装饰性外框 */}
      <div
        style={{
          position: 'absolute',
          inset: '-2px',
          borderRadius: '18px',
          background: `linear-gradient(180deg, ${mapColors.primary.base}40, transparent 50%, ${mapColors.primary.base}20)`,
          opacity: 0.5,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          padding: '12px',
          background: `linear-gradient(145deg, rgba(15, 22, 41, 0.95), rgba(26, 35, 50, 0.9))`,
          borderRadius: '16px',
          border: `1px solid ${mapColors.legend.border}`,
          backdropFilter: 'blur(16px)',
          boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.05)
          `,
          position: 'relative',
        }}
      >
        {/* 顶部装饰线 */}
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '30px',
            height: '2px',
            background: `linear-gradient(90deg, transparent, ${mapColors.primary.base}, transparent)`,
            borderRadius: '1px',
          }}
        />

        <Tooltip title="放大" placement="left" color={mapColors.tooltip.background}>
          <Button
            type="text"
            icon={<PlusOutlined style={{ fontSize: '18px' }} />}
            style={buttonStyle}
            onClick={onZoomIn}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = mapColors.primary.base;
              e.currentTarget.style.color = mapColors.primary.base;
              e.currentTarget.style.boxShadow = `
                0 4px 16px rgba(82, 196, 26, 0.3),
                0 0 20px ${mapColors.primary.glow},
                inset 0 1px 0 rgba(255, 255, 255, 0.1)
              `;
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(82, 196, 26, 0.3)';
              e.currentTarget.style.color = mapColors.text.secondary;
              e.currentTarget.style.boxShadow = `
                0 4px 12px rgba(0, 0, 0, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.05)
              `;
              e.currentTarget.style.transform = 'scale(1)';
            }}
          />
        </Tooltip>

        <Tooltip title="缩小" placement="left" color={mapColors.tooltip.background}>
          <Button
            type="text"
            icon={<MinusOutlined style={{ fontSize: '18px' }} />}
            style={buttonStyle}
            onClick={onZoomOut}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = mapColors.primary.base;
              e.currentTarget.style.color = mapColors.primary.base;
              e.currentTarget.style.boxShadow = `
                0 4px 16px rgba(82, 196, 26, 0.3),
                0 0 20px ${mapColors.primary.glow},
                inset 0 1px 0 rgba(255, 255, 255, 0.1)
              `;
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(82, 196, 26, 0.3)';
              e.currentTarget.style.color = mapColors.text.secondary;
              e.currentTarget.style.boxShadow = `
                0 4px 12px rgba(0, 0, 0, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.05)
              `;
              e.currentTarget.style.transform = 'scale(1)';
            }}
          />
        </Tooltip>

        {/* 分隔线 */}
        <div
          style={{
            height: '1px',
            margin: '4px 8px',
            background: `linear-gradient(90deg, transparent, ${mapColors.legend.border}, transparent)`,
          }}
        />

        <Tooltip title="重置视图" placement="left" color={mapColors.tooltip.background}>
          <Button
            type="text"
            icon={<AimOutlined style={{ fontSize: '18px' }} />}
            style={{
              ...buttonStyle,
              border: `1px solid rgba(255, 122, 0, 0.3)`,
            }}
            onClick={onReset}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = mapColors.accent.base;
              e.currentTarget.style.color = mapColors.accent.base;
              e.currentTarget.style.boxShadow = `
                0 4px 16px rgba(255, 122, 0, 0.3),
                0 0 20px ${mapColors.accent.glow},
                inset 0 1px 0 rgba(255, 255, 255, 0.1)
              `;
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 122, 0, 0.3)';
              e.currentTarget.style.color = mapColors.text.secondary;
              e.currentTarget.style.boxShadow = `
                0 4px 12px rgba(0, 0, 0, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.05)
              `;
              e.currentTarget.style.transform = 'scale(1)';
            }}
          />
        </Tooltip>

        {/* 底部装饰线 */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '30px',
            height: '2px',
            background: `linear-gradient(90deg, transparent, ${mapColors.accent.base}, transparent)`,
            borderRadius: '1px',
          }}
        />
      </div>
    </div>
  );
};

export default MapControls;
