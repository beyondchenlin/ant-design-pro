/**
 * CityFilterCard 组件
 * 城市筛选卡片
 * Neo-Chinese Tech Luxury Aesthetic
 *
 * 设计元素：
 * - 玉璧形态的标签按钮
 * - 竹简卷轴式卡片容器
 * - 流光边框动效
 */

import React from 'react';
import { Card, Tag } from 'antd';
import { CompassOutlined } from '@ant-design/icons';
import type { CityFilterCardProps } from '@/types/map';
import { HOT_CITIES } from '@/types/map';
import { mapColors } from '@/config/mapColors';

/**
 * CityFilterCard 组件
 */
export const CityFilterCard: React.FC<CityFilterCardProps> = ({
  selectedCity = 'all',
  onCityChange,
  provinceData,
}) => {
  const handleCityClick = (cityCode: string) => {
    if (onCityChange) {
      onCityChange(cityCode);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* 流光边框动效 */}
      <div
        style={{
          position: 'absolute',
          inset: '-1px',
          borderRadius: '16px',
          background: `linear-gradient(135deg, ${mapColors.primary.base}, transparent 40%, transparent 60%, ${mapColors.accent.base})`,
          opacity: 0.6,
          animation: 'borderGlow 3s ease-in-out infinite',
          zIndex: 0,
        }}
      />

      <Card
        title={
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            {/* 装饰性图标 */}
            <div
              style={{
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                background: `linear-gradient(135deg, ${mapColors.primary.surface}, transparent)`,
                border: `1px solid ${mapColors.primary.base}`,
              }}
            >
              <CompassOutlined
                style={{
                  fontSize: '18px',
                  color: mapColors.primary.base,
                }}
              />
            </div>
            <div>
              <div style={{
                color: mapColors.text.primary,
                fontWeight: 700,
                fontSize: '15px',
                letterSpacing: '0.5px',
              }}>
                区域筛选
              </div>
              <div style={{
                fontSize: '11px',
                color: mapColors.text.tertiary,
                fontWeight: 400,
                marginTop: '2px',
              }}>
                REGION FILTER
              </div>
            </div>
          </div>
        }
        bordered={false}
        style={{
          position: 'relative',
          background: `linear-gradient(145deg, rgba(15, 22, 41, 0.98), rgba(26, 35, 50, 0.95))`,
          borderRadius: '16px',
          border: `1px solid ${mapColors.legend.border}`,
          boxShadow: `
            0 8px 32px ${mapColors.tooltip.shadow},
            inset 0 1px 0 rgba(255, 255, 255, 0.05)
          `,
          backdropFilter: 'blur(16px)',
          overflow: 'hidden',
          zIndex: 1,
        }}
        styles={{
          header: {
            borderBottom: `1px solid ${mapColors.legend.border}`,
            padding: '18px 22px',
            background: 'transparent',
          },
          body: {
            padding: '18px 22px',
          },
        }}
      >
        {/* 装饰性纹理背景 */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '120px',
            height: '120px',
            background: `radial-gradient(circle at 100% 0%, ${mapColors.primary.glow} 0%, transparent 70%)`,
            opacity: 0.1,
            pointerEvents: 'none',
          }}
        />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {HOT_CITIES.map((city) => {
            const isSelected = selectedCity === city.code;
            const count = city.code === 'all'
              ? provinceData ? Object.values(provinceData).reduce((sum, p) => sum + p.count, 0) : 0
              : provinceData?.[city.code]?.count || 0;

            return (
              <Tag
                key={city.code}
                onClick={() => handleCityClick(city.code)}
                style={{
                  margin: 0,
                  padding: '6px 14px',
                  fontSize: '13px',
                  fontWeight: isSelected ? 600 : 500,
                  cursor: 'pointer',
                  borderRadius: '20px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  whiteSpace: 'nowrap',
                  lineHeight: 1.4,
                  height: 'auto',
                  borderColor: isSelected ? '#ff7a00' : 'rgba(82, 196, 26, 0.4)',
                  background: isSelected
                    ? 'linear-gradient(135deg, rgba(255, 122, 0, 0.15), rgba(255, 122, 0, 0.08))'
                    : 'rgba(82, 196, 26, 0.05)',
                  color: isSelected ? '#ff7a00' : 'rgba(255, 255, 255, 0.65)',
                  boxShadow: isSelected ? '0 0 16px rgba(255, 122, 0, 0.3)' : 'none',
                }}
              >
                {city.name}
                {count > 0 && (
                  <span
                    style={{
                      marginLeft: '6px',
                      fontSize: '11px',
                      opacity: 0.9,
                      padding: '1px 5px',
                      borderRadius: '8px',
                      background: isSelected
                        ? 'rgba(255, 122, 0, 0.25)'
                        : 'rgba(82, 196, 26, 0.2)',
                    }}
                  >
                    {count}
                  </span>
                )}
              </Tag>
            );
          })}
        </div>
      </Card>

      {/* 动画样式 */}
      <style>
        {`
          @keyframes borderGlow {
            0%, 100% {
              opacity: 0.4;
            }
            50% {
              opacity: 0.7;
            }
          }
        `}
      </style>
    </div>
  );
};

export default CityFilterCard;
