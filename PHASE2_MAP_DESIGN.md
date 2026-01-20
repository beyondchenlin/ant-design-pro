# Phase 2: 地图功能实现方案

> **项目名称**: 懒人同城号 - 地图可视化模块
> **设计风格**: Neo-Chinese Tech Luxury Aesthetic
> **文档版本**: v1.0
> **创建日期**: 2026-01-20
> **参考来源**: cluster_monitor 文件夹

---

## 1. 参考实现分析

### 1.1 数据结构分析

**数据来源**: `cluster_monitor/data/map_points.json`

```typescript
// 数据统计
{
  total_count: 722,      // 总点位数
  province_count: 31,    // 覆盖省份数
  points: [...]          // 点位数组
}

// 单个点位结构
interface MapPoint {
  name: string;           // 用户名称
  address: string;        // 详细地址
  province: string;       // 省份名称
  coordinates: [number, number];  // [经度, 纬度]
  value: [number, number, number]; // [经度, 纬度, 权重值]
}

// 省份聚合数据
interface ProvinceData {
  [provinceName: string]: {
    count: number;        // 省份内用户数
    names: string[];      // 用户名列表
    center: [number, number]; // 省份中心坐标
  }
}
```

### 1.2 参考实现技术栈

| 技术 | 用途 | 我们的方案 |
|------|------|-----------|
| ECharts | 地图渲染引擎 | 保留使用 |
| china.js | 中国地图 GeoJSON | 保留使用 |
| jQuery | DOM 操作 | 移除，使用 React |
| 原生 JS | 业务逻辑 | 迁移至 TypeScript |

### 1.3 参考实现配色方案

```javascript
// 原有配色（需要替换）
const ORIGINAL_COLORS = {
  centerNode: '#dc3545',      // 红色（中心节点）
  normalNodes: '#fce182',     // 金色（普通节点）
  flylines: '#fce182',        // 金色（飞线）
  background: '#1a1e45',      // 深蓝背景
  border: '#22ccfb',          // 青色边框
  userPoints: '#ff6b6b',      // 红色（用户点）
  accent: '#00bcd4',          // 青色（强调色）
};
```

---

## 2. Neo-Chinese Tech Luxury 配色方案

### 2.1 品牌色映射

基于 `DESIGN_SPEC.md` 定义的品牌色系统，将参考实现的颜色映射到我们的品牌色：

```typescript
// config/mapColors.ts
export const mapColors = {
  // 主色系 - 玉绿色（象征生长与机遇）
  primary: {
    base: '#52c41a',           // 品牌绿
    light: '#73d13d',          // 悬停态
    dark: '#389e0d',           // 激活态
    glow: 'rgba(82, 196, 26, 0.6)',  // 发光效果
    surface: 'rgba(82, 196, 26, 0.08)', // 浅底色
  },

  // 强调色 - 琥珀橙（象征收获与成就）
  accent: {
    base: '#ff7a00',           // 选中/高亮
    light: '#ff9633',          // 悬停态
    glow: 'rgba(255, 122, 0, 0.6)', // 发光效果
    surface: '#fff7e6',        // 浅底色
  },

  // 地图专用色
  map: {
    background: '#0f1629',     // 深邃夜空蓝（比原版更深沉）
    backgroundGradient: 'linear-gradient(135deg, #0a0f1f 0%, #1a2332 50%, #0f1629 100%)',
    border: '#52c41a',         // 玉绿色边框
    borderGlow: 'rgba(82, 196, 26, 0.4)',
    landFill: '#1a2332',       // 陆地填充
    landBorder: 'rgba(82, 196, 26, 0.6)', // 省份边界
  },

  // 节点色系
  nodes: {
    center: '#ff7a00',         // 中心节点（琥珀橙）
    centerGlow: 'rgba(255, 122, 0, 0.8)',
    normal: '#52c41a',         // 普通节点（玉绿色）
    normalGlow: 'rgba(82, 196, 26, 0.6)',
    hover: '#73d13d',          // 悬停态
    selected: '#ff7a00',       // 选中态
  },

  // 飞线色系
  flylines: {
    line: 'rgba(82, 196, 26, 0.6)',  // 玉绿色飞线
    arrow: '#ff7a00',                 // 琥珀橙箭头
    trail: 'rgba(82, 196, 26, 0.3)', // 轨迹
  },

  // 文字色系
  text: {
    primary: '#ffffff',
    secondary: 'rgba(255, 255, 255, 0.85)',
    tertiary: 'rgba(255, 255, 255, 0.65)',
    accent: '#52c41a',
  },
};
```

### 2.2 设计理念

**Neo-Chinese Tech Luxury** 核心元素：

| 元素 | 传统寓意 | 现代表达 |
|------|---------|---------|
| 玉绿色 | 玉石、生机、希望 | 数据节点、成功状态 |
| 琥珀橙 | 琥珀、珍贵、成就 | 选中状态、关键指标 |
| 深邃蓝 | 夜空、无限、科技 | 地图背景、空间感 |
| 金色点缀 | 皇家、尊贵、VIP | VIP 标签、排名徽章 |

---

## 3. 组件架构设计

### 3.1 目录结构

```
src/
├── components/
│   └── MapView/
│       ├── index.tsx              # 主组件入口
│       ├── index.css              # 样式文件
│       ├── EChartsMap.tsx         # ECharts 地图组件
│       ├── CityFilterCard.tsx     # 城市筛选悬浮卡片
│       ├── MapControls.tsx        # 地图控制按钮（缩放）
│       ├── MapLegend.tsx          # 图例组件
│       ├── PointDetailModal.tsx   # 点位详情弹窗
│       └── hooks/
│           ├── useMapData.ts      # 数据加载 Hook
│           ├── useMapInteraction.ts # 交互逻辑 Hook
│           └── useMapAnimation.ts # 动画效果 Hook
├── config/
│   └── mapColors.ts               # 地图配色配置
├── data/
│   └── map_points.json            # 地图点位数据（从参考复制）
├── types/
│   └── map.ts                     # 地图相关类型定义
└── utils/
    └── mapUtils.ts                # 地图工具函数
```

### 3.2 核心组件设计

#### 3.2.1 MapView 主组件

```tsx
// components/MapView/index.tsx
import React, { useState, useCallback } from 'react';
import { Card, Spin } from 'antd';
import { EChartsMap } from './EChartsMap';
import { CityFilterCard } from './CityFilterCard';
import { MapControls } from './MapControls';
import { MapLegend } from './MapLegend';
import { PointDetailModal } from './PointDetailModal';
import { useMapData } from './hooks/useMapData';
import { useMapInteraction } from './hooks/useMapInteraction';
import type { MapPoint, MapViewProps } from '@/types/map';
import './index.css';

export const MapView: React.FC<MapViewProps> = ({
  onPointClick,
  onCityChange,
  selectedCity,
  activePointId,
  hoveredPointId,
}) => {
  const { data, loading, error, refetch } = useMapData();
  const {
    mapInstance,
    setMapInstance,
    handleZoomIn,
    handleZoomOut,
    flyToPoint,
    highlightPoint,
  } = useMapInteraction();

  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);

  const handlePointClick = useCallback((point: MapPoint) => {
    setSelectedPoint(point);
    setDetailModalVisible(true);
    onPointClick?.(point);
  }, [onPointClick]);

  return (
    <div className="map-view-container">
      {/* 悬浮城市筛选卡片 */}
      <CityFilterCard
        selectedCity={selectedCity}
        onCityChange={onCityChange}
        provinceData={data?.provinces}
      />

      {/* 地图主体 */}
      <Spin spinning={loading} tip="地图加载中...">
        <div className="map-wrapper">
          <EChartsMap
            data={data}
            onReady={setMapInstance}
            onPointClick={handlePointClick}
            activePointId={activePointId}
            hoveredPointId={hoveredPointId}
            selectedCity={selectedCity}
          />
        </div>
      </Spin>

      {/* 地图控制按钮 */}
      <MapControls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
      />

      {/* 图例 */}
      <MapLegend />

      {/* 点位详情弹窗 */}
      <PointDetailModal
        visible={detailModalVisible}
        point={selectedPoint}
        onClose={() => setDetailModalVisible(false)}
        sameProvinceUsers={data?.provinces?.[selectedPoint?.province]?.names}
      />
    </div>
  );
};
```

#### 3.2.2 EChartsMap 组件

```tsx
// components/MapView/EChartsMap.tsx
import React, { useEffect, useRef, useCallback } from 'react';
import * as echarts from 'echarts';
import chinaGeoJson from '@/data/china.json';
import { mapColors } from '@/config/mapColors';
import type { MapData, MapPoint } from '@/types/map';

interface EChartsMapProps {
  data: MapData | null;
  onReady?: (instance: echarts.ECharts) => void;
  onPointClick?: (point: MapPoint) => void;
  activePointId?: string;
  hoveredPointId?: string;
  selectedCity?: string;
}

export const EChartsMap: React.FC<EChartsMapProps> = ({
  data,
  onReady,
  onPointClick,
  activePointId,
  hoveredPointId,
  selectedCity,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  // 初始化地图
  useEffect(() => {
    if (!chartRef.current) return;

    // 注册中国地图
    echarts.registerMap('china', chinaGeoJson as any);

    // 创建实例
    chartInstance.current = echarts.init(chartRef.current);
    onReady?.(chartInstance.current);

    // 设置基础配置
    const option = buildMapOption(data, selectedCity);
    chartInstance.current.setOption(option);

    // 绑定点击事件
    chartInstance.current.on('click', 'series.scatter', (params: any) => {
      onPointClick?.(params.data);
    });

    // 响应式
    const handleResize = () => chartInstance.current?.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstance.current?.dispose();
    };
  }, []);

  // 数据更新
  useEffect(() => {
    if (!chartInstance.current || !data) return;
    const option = buildMapOption(data, selectedCity);
    chartInstance.current.setOption(option, { notMerge: false });
  }, [data, selectedCity]);

  // 高亮点位
  useEffect(() => {
    if (!chartInstance.current) return;
    // 实现高亮逻辑...
  }, [activePointId, hoveredPointId]);

  return <div ref={chartRef} className="echarts-map" />;
};

// 构建地图配置
function buildMapOption(data: MapData | null, selectedCity?: string): echarts.EChartsOption {
  const scatterData = data?.points?.map(point => ({
    ...point,
    value: point.value,
    itemStyle: {
      color: mapColors.nodes.normal,
      shadowBlur: 10,
      shadowColor: mapColors.nodes.normalGlow,
    },
  })) || [];

  return {
    backgroundColor: mapColors.map.background,
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(15, 22, 41, 0.95)',
      borderColor: mapColors.primary.base,
      borderWidth: 1,
      textStyle: { color: mapColors.text.primary },
      formatter: (params: any) => {
        const { name, address, province } = params.data;
        return `
          <div style="padding: 8px;">
            <div style="color: ${mapColors.accent.base}; font-weight: bold; margin-bottom: 6px;">
              ✦ ${name}
            </div>
            <div style="color: ${mapColors.text.secondary}; margin-bottom: 4px;">
              📍 ${address}
            </div>
            <div style="color: ${mapColors.text.tertiary}; font-size: 12px;">
              🗺️ ${province}
            </div>
          </div>
        `;
      },
    },
    geo: {
      map: 'china',
      roam: true,
      zoom: 1.2,
      center: [104.114129, 37.550339],
      itemStyle: {
        areaColor: mapColors.map.landFill,
        borderColor: mapColors.map.landBorder,
        borderWidth: 1,
        shadowBlur: 20,
        shadowColor: mapColors.map.borderGlow,
      },
      emphasis: {
        itemStyle: {
          areaColor: 'rgba(82, 196, 26, 0.15)',
          borderColor: mapColors.primary.base,
          borderWidth: 2,
        },
        label: {
          show: true,
          color: mapColors.text.primary,
        },
      },
      select: {
        itemStyle: {
          areaColor: 'rgba(255, 122, 0, 0.15)',
          borderColor: mapColors.accent.base,
        },
      },
    },
    series: [
      // 用户分布散点图
      {
        name: '用户分布',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: scatterData,
        symbol: 'path://M12 2L14.09 8.26L20.18 8.26L15.54 12.14L17.63 18.4L12 14.52L6.37 18.4L8.46 12.14L3.82 8.26L9.91 8.26L12 2Z', // 六角星
        symbolSize: 16,
        itemStyle: {
          color: mapColors.nodes.normal,
          shadowBlur: 10,
          shadowColor: mapColors.nodes.normalGlow,
        },
        emphasis: {
          scale: 1.5,
          itemStyle: {
            color: mapColors.accent.base,
            shadowBlur: 20,
            shadowColor: mapColors.accent.glow,
          },
        },
      },
      // 涟漪效果点（活跃用户）
      {
        name: '活跃用户',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: scatterData.slice(0, 20), // 取前20个作为活跃用户
        symbol: 'path://M12 2L14.09 8.26L20.18 8.26L15.54 12.14L17.63 18.4L12 14.52L6.37 18.4L8.46 12.14L3.82 8.26L9.91 8.26L12 2Z',
        symbolSize: 20,
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke',
          scale: 3,
          period: 4,
        },
        itemStyle: {
          color: mapColors.accent.base,
          shadowBlur: 15,
          shadowColor: mapColors.accent.glow,
        },
      },
    ],
  };
}
```

#### 3.2.3 CityFilterCard 组件

```tsx
// components/MapView/CityFilterCard.tsx
import React, { useState, useMemo } from 'react';
import { Card, Input, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { ProvinceData } from '@/types/map';
import './CityFilterCard.css';

interface CityFilterCardProps {
  selectedCity?: string;
  onCityChange?: (city: string) => void;
  provinceData?: ProvinceData;
}

const HOT_CITIES = [
  { code: 'all', name: '全国' },
  { code: '广东省', name: '广东' },
  { code: '山东省', name: '山东' },
  { code: '河南省', name: '河南' },
  { code: '江苏省', name: '江苏' },
  { code: '河北省', name: '河北' },
  { code: '四川省', name: '四川' },
  { code: '浙江省', name: '浙江' },
  { code: '湖北省', name: '湖北' },
  { code: '湖南省', name: '湖南' },
];

export const CityFilterCard: React.FC<CityFilterCardProps> = ({
  selectedCity = 'all',
  onCityChange,
  provinceData,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [showAllCities, setShowAllCities] = useState(false);

  // 获取省份用户数
  const getProvinceCount = (code: string) => {
    if (code === 'all') return null;
    return provinceData?.[code]?.count;
  };

  // 过滤城市
  const filteredCities = useMemo(() => {
    if (!searchValue) return HOT_CITIES;
    return HOT_CITIES.filter(city =>
      city.name.includes(searchValue) || city.code.includes(searchValue)
    );
  }, [searchValue]);

  return (
    <Card
      bordered={false}
      className="city-filter-card"
      bodyStyle={{ padding: '12px 16px' }}
    >
      <div className="city-filter-header">
        <Typography.Text strong className="filter-title">
          城市列表
        </Typography.Text>
        <Input
          placeholder="城市搜索"
          prefix={<SearchOutlined style={{ color: 'var(--color-text-tertiary)' }} />}
          size="small"
          style={{ width: 100 }}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      {/* 城市链接列表（纯文字链接样式） */}
      <div className="city-links-wrapper">
        {filteredCities.map((city) => {
          const count = getProvinceCount(city.code);
          return (
            <a
              key={city.code}
              className={`city-link ${selectedCity === city.code ? 'city-link-active' : ''}`}
              onClick={() => onCityChange?.(city.code)}
            >
              {city.name}
              {count && <span className="city-count">({count})</span>}
            </a>
          );
        })}
      </div>

      <a
        className="show-all-cities"
        onClick={() => setShowAllCities(!showAllCities)}
      >
        {showAllCities ? '收起 ▲' : '全部城市 ▼'}
      </a>
    </Card>
  );
};
```

---

## 4. 样式规范

### 4.1 地图容器样式

```css
/* components/MapView/index.css */

.map-view-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 48px);
  background: var(--map-background);
  overflow: hidden;
}

/* ECharts 地图容器 */
.map-wrapper {
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 48px);
}

.echarts-map {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background: linear-gradient(135deg, #0a0f1f 0%, #1a2332 50%, #0f1629 100%);
  border: 2px solid var(--brand-primary);
  box-shadow:
    0 0 20px rgba(82, 196, 26, 0.2),
    inset 0 0 40px rgba(0, 0, 0, 0.3);
}

/* 悬浮城市筛选卡片 */
.city-filter-card {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 100;
  width: 280px;
  background: rgba(255, 255, 255, 0.98);
  border-radius: 8px;
  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.1),
    0 0 1px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  animation: slideInLeft 0.4s var(--ease-out);
}

.city-filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.filter-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
}

/* 城市链接容器 */
.city-links-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 16px 20px;
  margin-bottom: 8px;
}

/* 城市链接样式（纯文字链接，非 Tag） */
.city-link {
  font-size: 14px;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s var(--ease-out);
  text-decoration: none;
  position: relative;
}

.city-link:hover {
  color: var(--brand-accent);
}

/* 选中态（琥珀橙） */
.city-link-active {
  color: var(--brand-accent) !important;
  font-weight: 600;
}

.city-link-active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--brand-accent);
  border-radius: 1px;
}

.city-count {
  font-size: 12px;
  color: var(--color-text-tertiary);
  margin-left: 2px;
}

/* 全部城市链接 */
.show-all-cities {
  display: inline-block;
  margin-top: 8px;
  font-size: 12px;
  color: var(--color-text-tertiary);
  cursor: pointer;
  transition: color 0.2s var(--ease-out);
}

.show-all-cities:hover {
  color: var(--brand-accent);
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
  background: rgba(255, 255, 255, 0.98);
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.zoom-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: #ffffff;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s var(--ease-out);
  color: var(--color-text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.zoom-btn:hover {
  background: var(--brand-primary-light);
  color: var(--brand-primary);
}

.zoom-btn:first-child {
  border-bottom: 1px solid var(--color-border-light);
}

/* 图例 */
.map-legend {
  position: absolute;
  left: 16px;
  bottom: 16px;
  z-index: 100;
  background: rgba(15, 22, 41, 0.95);
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid rgba(82, 196, 26, 0.3);
  backdrop-filter: blur(10px);
}

.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.85);
}

.legend-item:last-child {
  margin-bottom: 0;
}

.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
  box-shadow: 0 0 8px currentColor;
}

.legend-dot-primary {
  background: var(--brand-primary);
  box-shadow: 0 0 8px rgba(82, 196, 26, 0.6);
}

.legend-dot-accent {
  background: var(--brand-accent);
  box-shadow: 0 0 8px rgba(255, 122, 0, 0.6);
}

.legend-dot-active {
  animation: pulse 2s ease-in-out infinite;
}

/* 动画定义 */
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.8;
  }
}

/* 地图版权信息 */
.map-attribution {
  position: absolute;
  right: 16px;
  bottom: 16px;
  z-index: 100;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
}
```

### 4.2 点位详情弹窗样式

```css
/* components/MapView/PointDetailModal.css */

.point-detail-modal .ant-modal-content {
  background: linear-gradient(135deg, #0f1629 0%, #1a2332 100%);
  border: 1px solid rgba(82, 196, 26, 0.3);
  border-radius: 12px;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.4),
    0 0 40px rgba(82, 196, 26, 0.1);
}

.point-detail-modal .ant-modal-header {
  background: transparent;
  border-bottom: 1px solid rgba(82, 196, 26, 0.2);
  padding: 16px 24px;
}

.point-detail-modal .ant-modal-title {
  color: var(--brand-accent);
  font-weight: 600;
}

.point-detail-modal .ant-modal-body {
  padding: 24px;
}

.point-detail-modal .ant-modal-close {
  color: rgba(255, 255, 255, 0.65);
}

.point-detail-modal .ant-modal-close:hover {
  color: var(--brand-accent);
}

.detail-row {
  display: flex;
  margin-bottom: 16px;
}

.detail-label {
  width: 80px;
  color: rgba(255, 255, 255, 0.65);
  font-size: 13px;
}

.detail-value {
  flex: 1;
  color: #ffffff;
  font-size: 14px;
}

.detail-coordinate {
  font-family: 'JetBrains Mono', monospace;
  color: var(--brand-primary);
  font-size: 12px;
}

.same-province-users {
  margin-top: 16px;
  padding: 12px;
  background: rgba(82, 196, 26, 0.08);
  border-radius: 8px;
  border: 1px solid rgba(82, 196, 26, 0.2);
}

.same-province-title {
  color: var(--brand-primary);
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 8px;
}

.same-province-list {
  max-height: 100px;
  overflow-y: auto;
  color: rgba(255, 255, 255, 0.75);
  font-size: 12px;
  line-height: 1.6;
}
```

---

## 5. 数据迁移方案

### 5.1 复制数据文件

```bash
# 将参考数据复制到项目中
cp cluster_monitor/data/map_points.json src/data/
cp cluster_monitor/static/js/china.js src/data/
```

### 5.2 TypeScript 类型适配

```typescript
// types/map.ts

export interface MapPoint {
  id?: string;
  name: string;
  address: string;
  province: string;
  coordinates: [number, number];
  value: [number, number, number];
}

export interface ProvinceData {
  count: number;
  names: string[];
  center: [number, number];
}

export interface MapData {
  total_count: number;
  province_count: number;
  points: MapPoint[];
  provinces: Record<string, ProvinceData>;
}

export interface MapViewProps {
  onPointClick?: (point: MapPoint) => void;
  onCityChange?: (city: string) => void;
  selectedCity?: string;
  activePointId?: string;
  hoveredPointId?: string;
}
```

### 5.3 数据加载 Hook

```typescript
// components/MapView/hooks/useMapData.ts

import { useState, useEffect } from 'react';
import type { MapData } from '@/types/map';

export function useMapData() {
  const [data, setData] = useState<MapData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      // 直接导入本地 JSON
      const mapPoints = await import('@/data/map_points.json');
      setData(mapPoints.default as MapData);
      setError(null);
    } catch (err) {
      setError(err as Error);
      console.error('地图数据加载失败:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return { data, loading, error, refetch: loadData };
}
```

---

## 6. 高德地图迁移预案

### 6.1 抽象层设计

为后续迁移高德地图，设计统一的地图抽象接口：

```typescript
// interfaces/IMapProvider.ts

export interface IMapProvider {
  // 初始化
  init(container: HTMLElement, options: MapOptions): void;

  // 销毁
  destroy(): void;

  // 缩放控制
  zoomIn(): void;
  zoomOut(): void;
  setZoom(level: number): void;

  // 中心点控制
  setCenter(lng: number, lat: number): void;
  flyTo(lng: number, lat: number, zoom?: number): void;

  // 标记点
  addMarkers(points: MapPoint[]): void;
  removeMarkers(): void;
  highlightMarker(id: string): void;

  // 事件
  on(event: string, callback: Function): void;
  off(event: string, callback: Function): void;
}

// 当前使用 ECharts 实现
export class EChartsMapProvider implements IMapProvider { ... }

// 未来可添加高德地图实现
export class AMapProvider implements IMapProvider { ... }
```

### 6.2 迁移检查清单

当需要迁移到高德地图时：

- [ ] 申请高德地图 API Key
- [ ] 安装 `@amap/amap-jsapi-react` 依赖
- [ ] 实现 `AMapProvider` 类
- [ ] 更新 `MapView` 组件使用新的 Provider
- [ ] 测试所有交互功能
- [ ] 更新文档

---

## 7. 实施任务清单

### Phase 2.1: 基础设施搭建

- [ ] **2.1.1** 创建 `src/config/mapColors.ts` 配色文件
- [ ] **2.1.2** 创建 `src/types/map.ts` 类型定义
- [ ] **2.1.3** 复制 `map_points.json` 到 `src/data/`
- [ ] **2.1.4** 复制 `china.js` 到 `src/data/` 并转换为 JSON
- [ ] **2.1.5** 安装 ECharts 依赖 (`echarts`, `echarts-for-react`)

### Phase 2.2: 核心组件开发

- [ ] **2.2.1** 实现 `useMapData` Hook
- [ ] **2.2.2** 实现 `EChartsMap` 组件（基础渲染）
- [ ] **2.2.3** 实现 `CityFilterCard` 城市筛选组件
- [ ] **2.2.4** 实现 `MapControls` 缩放控制组件
- [ ] **2.2.5** 实现 `MapLegend` 图例组件
- [ ] **2.2.6** 实现 `MapView` 主组件整合

### Phase 2.3: 交互功能

- [ ] **2.3.1** 实现点位悬停高亮（六角星放大 + 发光）
- [ ] **2.3.2** 实现点位点击弹窗详情
- [ ] **2.3.3** 实现城市筛选联动地图缩放
- [ ] **2.3.4** 实现涟漪动画效果
- [ ] **2.3.5** 实现省份悬停高亮

### Phase 2.4: 样式完善

- [ ] **2.4.1** 应用 Neo-Chinese Tech Luxury 配色
- [ ] **2.4.2** 实现深邃夜空背景渐变
- [ ] **2.4.3** 实现玉绿色省份边界
- [ ] **2.4.4** 实现琥珀橙选中/高亮效果
- [ ] **2.4.5** 响应式适配

### Phase 2.5: 集成测试

- [ ] **2.5.1** 集成到主页面布局
- [ ] **2.5.2** 与排行榜联动预留接口
- [ ] **2.5.3** 性能测试（722 个点位渲染）
- [ ] **2.5.4** 浏览器兼容性测试

---

## 8. 风险与注意事项

### 8.1 技术风险

| 风险 | 影响 | 缓解措施 |
|------|------|---------|
| ECharts 中国地图 GeoJSON 版本 | 可能缺少部分省份数据 | 使用参考项目中已验证的 china.js |
| 大量点位渲染性能 | 722 个点可能卡顿 | 使用 effectScatter 仅渲染活跃点 |
| 浏览器兼容性 | IE 不支持 | 放弃 IE 支持，提示升级浏览器 |

### 8.2 设计注意事项

1. **配色一致性**: 所有地图元素必须使用 `mapColors` 配置，禁止硬编码颜色值
2. **动画克制**: 涟漪效果仅用于前 20 个活跃点，避免过度动画
3. **交互反馈**: 所有可点击元素必须有悬停态变化
4. **无障碍**: 确保色彩对比度符合 WCAG AA 标准

---

## 附录

### A. 参考文件清单

| 文件路径 | 用途 |
|---------|------|
| `cluster_monitor/data/map_points.json` | 722 个用户点位数据 |
| `cluster_monitor/static/js/china.js` | 中国地图 GeoJSON |
| `cluster_monitor/static/js/map_config_new.js` | ECharts 地图配置参考 |
| `cluster_monitor/static/js/map_points_display.js` | 点位显示逻辑参考 |
| `cluster_monitor/static/css/map_dashboard_extracted.css` | 样式参考 |
| `cluster_monitor/templates/map_dashboard.html` | 布局结构参考 |

### B. 相关文档

- [设计规范文档](./DESIGN_SPEC.md) - 完整的设计规范
- [实施计划](./IMPLEMENTATION_PLAN.md) - 总体项目计划
- [Git 提交规范](./GIT_COMMIT.md) - 提交信息模板

---

**文档版本**: v1.0
**创建日期**: 2026-01-20
**维护者**: AI Assistant (Claude)
