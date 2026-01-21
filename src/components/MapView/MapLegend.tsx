/**
 * MapLegend 组件
 * 地图图例
 * Neo-Chinese Tech Luxury Aesthetic
 *
 * 设计元素：
 * - 玉环形态的图例标记
 * - 篆刻风格的装饰
 * - 流光脉动动效
 */

import React from 'react';
import type { MapLegendProps, LegendItem } from '@/types/map';
import { mapColors } from '@/config/mapColors';

// 默认图例项
const DEFAULT_LEGEND_ITEMS: LegendItem[] = [
  {
    color: mapColors.nodes.normal,
    label: '用户分布',
    isActive: true,
  },
  {
    color: mapColors.nodes.selected,
    label: '已选中',
    isActive: false,
  },
];

/**
 * MapLegend 组件
 */
export const MapLegend: React.FC<MapLegendProps> = ({
  items = DEFAULT_LEGEND_ITEMS,
}) => {
  return (
    <div style={{ position: 'relative' }}>
      {/* 装饰性外框 */}
      <div
        style={{
          position: 'absolute',
          inset: '-1px',
          borderRadius: '14px',
          background: `linear-gradient(135deg, ${mapColors.primary.base}50, transparent 40%, transparent 60%, ${mapColors.accent.base}30)`,
          opacity: 0.6,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          padding: '18px 20px',
          background: `linear-gradient(145deg, rgba(15, 22, 41, 0.95), rgba(26, 35, 50, 0.9))`,
          borderRadius: '14px',
          border: `1px solid ${mapColors.legend.border}`,
          backdropFilter: 'blur(16px)',
          boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.05)
          `,
          position: 'relative',
          minWidth: '140px',
        }}
      >
        {/* 标题区域 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            paddingBottom: '12px',
            borderBottom: `1px solid ${mapColors.legend.border}`,
          }}
        >
          {/* 装饰性菱形图标 */}
          <div
            style={{
              width: '20px',
              height: '20px',
              transform: 'rotate(45deg)',
              border: `2px solid ${mapColors.primary.base}`,
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 0 12px ${mapColors.primary.glow}`,
            }}
          >
            <div
              style={{
                width: '6px',
                height: '6px',
                background: mapColors.primary.base,
                borderRadius: '1px',
              }}
            />
          </div>
          <div
            style={{
              fontSize: '14px',
              fontWeight: 700,
              color: mapColors.text.primary,
              letterSpacing: '1px',
            }}
          >
            图例
          </div>
          <div
            style={{
              fontSize: '10px',
              color: mapColors.text.tertiary,
              marginLeft: 'auto',
              fontWeight: 500,
              letterSpacing: '0.5px',
            }}
          >
            LEGEND
          </div>
        </div>

        {/* 图例列表 */}
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              opacity: item.isActive !== false ? 1 : 0.5,
              transition: 'opacity 0.3s ease',
            }}
          >
            {/* 玉环形态的图例标记 */}
            <div
              style={{
                position: 'relative',
                width: '22px',
                height: '22px',
              }}
            >
              {/* 外圈光晕 */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${item.color}40, transparent 70%)`,
                  animation: item.isActive !== false ? 'legendRipple 2.5s ease-out infinite' : 'none',
                }}
              />
              {/* 玉环外圈 */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  border: `2px solid ${item.color}`,
                  boxShadow: `
                    0 0 8px ${item.color},
                    inset 0 0 4px ${item.color}40
                  `,
                  animation: item.isActive !== false ? 'legendPulse 2s infinite' : 'none',
                }}
              />
              {/* 玉环内芯 */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: item.color,
                  boxShadow: `0 0 6px ${item.color}`,
                }}
              />
            </div>

            {/* 图例文字 */}
            <span
              style={{
                fontSize: '13px',
                color: item.isActive !== false ? mapColors.text.secondary : mapColors.text.tertiary,
                fontWeight: 500,
                letterSpacing: '0.3px',
              }}
            >
              {item.label}
            </span>
          </div>
        ))}

        {/* 底部装饰 */}
        <div
          style={{
            marginTop: '4px',
            height: '2px',
            background: `linear-gradient(90deg, ${mapColors.primary.base}, transparent 50%, ${mapColors.accent.base})`,
            borderRadius: '1px',
            opacity: 0.5,
          }}
        />
      </div>

      {/* 动画样式 */}
      <style>
        {`
          @keyframes legendPulse {
            0%, 100% {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1);
            }
            50% {
              opacity: 0.7;
              transform: translate(-50%, -50%) scale(1.1);
            }
          }

          @keyframes legendRipple {
            0% {
              opacity: 0.6;
              transform: translate(-50%, -50%) scale(0.8);
            }
            100% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(2);
            }
          }
        `}
      </style>
    </div>
  );
};

export default MapLegend;
