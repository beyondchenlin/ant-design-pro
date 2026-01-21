/**
 * RankingPanel 组件
 * 排行榜面板（左下角）
 * Neo-Chinese Tech Luxury Aesthetic
 */

import React, { useState, useMemo } from 'react';
import { Card, Tabs, List, Tag, Empty } from 'antd';
import { TrophyOutlined, FireOutlined, RiseOutlined } from '@ant-design/icons';
import type { MapData, MapPoint } from '@/types/map';
import { HOT_CITIES } from '@/types/map';
import { mapColors } from '@/config/mapColors';

export interface RankingPanelProps {
  /** 地图数据 */
  data: MapData | null;
  /** 选中的城市 */
  selectedCity?: string;
  /** 点击排行榜项回调 */
  onItemClick?: (point: MapPoint) => void;
  /** 高亮的点位 ID */
  activePointId?: string | null;
}

/**
 * RankingPanel 组件
 */
export const RankingPanel: React.FC<RankingPanelProps> = ({
  data,
  selectedCity = 'all',
  onItemClick,
  activePointId,
}) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  // 根据选中的城市/标签页筛选数据
  const filteredPoints = useMemo(() => {
    if (!data?.points) return [];

    let points = data.points;

    // 按标签页筛选
    if (activeTab !== 'all') {
      points = points.filter((p) => p.province === activeTab);
    }

    // 按城市筛选（如果有）
    if (selectedCity && selectedCity !== 'all') {
      points = points.filter((p) => p.province === selectedCity);
    }

    // 排序：按名称字母顺序（实际项目中可能按活跃度等指标）
    return points.slice().sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
  }, [data, activeTab, selectedCity]);

  // 生成标签页
  const tabItems = useMemo(() => {
    const items = [
      {
        key: 'all',
        label: (
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FireOutlined />
            全部
          </span>
        ),
      },
    ];

    // 添加热门城市标签页
    HOT_CITIES.slice(1).forEach((city) => {
      const count = data?.provinces?.[city.code]?.count || 0;
      if (count > 0) {
        items.push({
          key: city.code,
          label: (
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {city.name}
              <span style={{ fontSize: '12px', opacity: 0.7 }}>({count})</span>
            </span>
          ),
        });
      }
    });

    return items;
  }, [data]);

  // 处理点击排行榜项
  const handleItemClick = (point: MapPoint) => {
    if (onItemClick) {
      onItemClick(point);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* 装饰性外框 */}
      <div
        style={{
          position: 'absolute',
          inset: '-1px',
          borderRadius: '18px',
          background: `linear-gradient(135deg, ${mapColors.accent.base}60, transparent 30%, transparent 70%, ${mapColors.primary.base}40)`,
          opacity: 0.5,
          animation: 'rankingBorderGlow 4s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />

      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* 奖杯图标容器 */}
            <div
              style={{
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '10px',
                background: `linear-gradient(135deg, ${mapColors.accent.surface}, rgba(255, 122, 0, 0.15))`,
                border: `1px solid ${mapColors.accent.base}`,
                boxShadow: `0 0 16px ${mapColors.accent.glow}`,
              }}
            >
              <TrophyOutlined
                style={{
                  color: mapColors.accent.base,
                  fontSize: '20px',
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  color: mapColors.text.primary,
                  fontWeight: 700,
                  fontSize: '16px',
                  letterSpacing: '0.5px',
                }}
              >
                用户排行
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: mapColors.text.tertiary,
                  fontWeight: 400,
                  marginTop: '2px',
                  letterSpacing: '0.5px',
                }}
              >
                USER RANKING
              </div>
            </div>
            <Tag
              style={{
                borderRadius: '16px',
                padding: '4px 14px',
                fontSize: '13px',
                fontWeight: 600,
                border: `1px solid ${mapColors.primary.base}`,
                background: `linear-gradient(135deg, ${mapColors.primary.surface}, rgba(82, 196, 26, 0.1))`,
                color: mapColors.primary.base,
                boxShadow: `0 0 12px ${mapColors.primary.glow}`,
              }}
            >
              {filteredPoints.length}
            </Tag>
          </div>
        }
        bordered={false}
        style={{
          width: '380px',
          maxHeight: '540px',
          background: `linear-gradient(145deg, rgba(15, 22, 41, 0.98), rgba(26, 35, 50, 0.95))`,
          borderRadius: '18px',
          border: `1px solid ${mapColors.legend.border}`,
          boxShadow: `
            0 12px 48px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.05)
          `,
          backdropFilter: 'blur(16px)',
          position: 'relative',
          overflow: 'hidden',
        }}
        headStyle={{
          borderBottom: `1px solid ${mapColors.legend.border}`,
          padding: '20px 22px',
          background: 'transparent',
        }}
        bodyStyle={{
          padding: 0,
          maxHeight: '440px',
          overflowY: 'auto',
        }}
      >
      {/* 标签页 */}
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        size="small"
        style={{
          padding: '0 20px',
        }}
        styles={{
          nav: {
            marginBottom: 0,
          },
          tab: {
            color: mapColors.text.secondary,
            fontSize: '13px',
          },
        }}
      />

      {/* 排行榜列表 */}
      <div style={{ padding: '12px 20px 20px' }}>
        {filteredPoints.length === 0 ? (
          <Empty
            description="暂无数据"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            style={{
              padding: '40px 0',
            }}
          />
        ) : (
          <List
            dataSource={filteredPoints.slice(0, 50)} // 最多显示 50 条
            renderItem={(point, index) => {
              const isActive = point.id === activePointId;
              const rankColor =
                index === 0
                  ? mapColors.accent.base
                  : index === 1
                  ? mapColors.primary.base
                  : index === 2
                  ? mapColors.primary.light
                  : mapColors.text.secondary;

              return (
                <List.Item
                  key={point.id}
                  onClick={() => handleItemClick(point)}
                  style={{
                    padding: '12px 16px',
                    margin: '0 0 8px 0',
                    cursor: 'pointer',
                    borderRadius: '12px',
                    border: `1px solid ${
                      isActive ? mapColors.accent.base : 'transparent'
                    }`,
                    background: isActive
                      ? mapColors.accent.surface
                      : 'transparent',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: isActive
                      ? `0 0 16px ${mapColors.accent.glow}`
                      : 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = mapColors.primary.surface;
                      e.currentTarget.style.borderColor = mapColors.primary.base;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.borderColor = 'transparent';
                    }
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      width: '100%',
                    }}
                  >
                    {/* 排名 */}
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '8px',
                        background:
                          index < 3 ? `${rankColor}22` : 'transparent',
                        border: `1px solid ${rankColor}`,
                        fontSize: '14px',
                        fontWeight: 600,
                        color: rankColor,
                      }}
                    >
                      {index < 3 ? (
                        <RiseOutlined />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>

                    {/* 用户信息 */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: '14px',
                          fontWeight: isActive ? 600 : 500,
                          color: isActive
                            ? mapColors.accent.base
                            : mapColors.text.primary,
                          marginBottom: '4px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {point.name}
                      </div>
                      <div
                        style={{
                          fontSize: '12px',
                          color: mapColors.text.secondary,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {point.province} · {point.address}
                      </div>
                    </div>

                    {/* 活跃指示器 */}
                    {isActive && (
                      <div
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: mapColors.accent.base,
                          boxShadow: `0 0 12px ${mapColors.accent.glow}`,
                          animation: 'rankingPulse 2s infinite',
                        }}
                      />
                    )}
                  </div>
                </List.Item>
              );
            }}
          />
        )}
      </div>

      {/* 脉冲动画 */}
      <style>
        {`
          @keyframes rankingPulse {
            0%, 100% {
              opacity: 1;
              transform: scale(1);
            }
            50% {
              opacity: 0.6;
              transform: scale(1.4);
            }
          }

          @keyframes rankingBorderGlow {
            0%, 100% {
              opacity: 0.4;
            }
            50% {
              opacity: 0.7;
            }
          }
        `}
      </style>
    </Card>
    </div>
  );
};

export default RankingPanel;
