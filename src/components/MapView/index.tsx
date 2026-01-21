/**
 * MapView 主组件
 * 地图可视化主界面
 * Neo-Chinese Tech Luxury Aesthetic
 */

import React, { useState, useCallback } from 'react';
import { Spin, Alert } from 'antd';
import type { EChartsInstance } from 'echarts-for-react';
import type { MapPoint } from '@/types/map';
import { useMapData } from './hooks/useMapData';
import { EChartsMap } from './EChartsMap';
import { CityFilterCard } from './CityFilterCard';
import { MapControls } from './MapControls';
import { MapLegend } from './MapLegend';
import { PointDetailModal } from './PointDetailModal';
import { RankingPanel } from './RankingPanel';
import { mapColors } from '@/config/mapColors';

/**
 * MapView 主组件
 */
export const MapView: React.FC = () => {
  // 数据加载
  const { data, loading, error } = useMapData();

  // 状态管理
  const [chartInstance, setChartInstance] = useState<EChartsInstance | null>(null);
  const [activePointId, setActivePointId] = useState<string | null>(null);
  const [hoveredPointId, setHoveredPointId] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);

  // 图表实例就绪回调
  const handleChartReady = useCallback((instance: EChartsInstance) => {
    setChartInstance(instance);
  }, []);

  // 点击地图点位
  const handlePointClick = useCallback((point: MapPoint) => {
    setActivePointId(point.id);
    setSelectedPoint(point);
    setDetailModalVisible(true);
  }, []);

  // 城市筛选
  const handleCityChange = useCallback((cityCode: string) => {
    setSelectedCity(cityCode);
    setActivePointId(null); // 切换城市时清除选中
    setDetailModalVisible(false); // 关闭详情弹窗
  }, []);

  // 关闭详情弹窗
  const handleCloseDetailModal = useCallback(() => {
    setDetailModalVisible(false);
    setActivePointId(null);
  }, []);

  // 点击排行榜项
  const handleRankingItemClick = useCallback((point: MapPoint) => {
    setActivePointId(point.id);
    setSelectedPoint(point);
    setDetailModalVisible(true);

    // 地图居中到该点位
    if (chartInstance && point.coordinates) {
      chartInstance.setOption({
        geo: {
          center: point.coordinates,
          zoom: 3,
        },
      });
    }
  }, [chartInstance]);

  // 地图控制：放大
  const handleZoomIn = useCallback(() => {
    if (chartInstance) {
      const option = chartInstance.getOption();
      const currentZoom = (option.geo as any)?.[0]?.zoom || 1;
      chartInstance.setOption({
        geo: {
          zoom: Math.min(currentZoom * 1.2, 5),
        },
      });
    }
  }, [chartInstance]);

  // 地图控制：缩小
  const handleZoomOut = useCallback(() => {
    if (chartInstance) {
      const option = chartInstance.getOption();
      const currentZoom = (option.geo as any)?.[0]?.zoom || 1;
      chartInstance.setOption({
        geo: {
          zoom: Math.max(currentZoom / 1.2, 1),
        },
      });
    }
  }, [chartInstance]);

  // 地图控制：重置
  const handleReset = useCallback(() => {
    if (chartInstance) {
      chartInstance.setOption({
        geo: {
          zoom: selectedCity && selectedCity !== 'all' ? 1.5 : 1.2,
          center: selectedCity && selectedCity !== 'all' ? undefined : [104.114129, 37.550339],
        },
      });
    }
  }, [chartInstance, selectedCity]);

  // 加载状态
  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          background: mapColors.map.background,
        }}
      >
        <Spin size="large" tip="加载地图数据中..." />
      </div>
    );
  }

  // 错误状态
  if (error) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          background: mapColors.map.background,
          padding: '20px',
        }}
      >
        <Alert
          message="加载失败"
          description={error.message}
          type="error"
          showIcon
        />
      </div>
    );
  }

  // 主界面
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        background: mapColors.map.background,
        overflow: 'hidden',
      }}
    >
      {/* 地图主体 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <EChartsMap
          data={data}
          onReady={handleChartReady}
          onPointClick={handlePointClick}
          activePointId={activePointId}
          hoveredPointId={hoveredPointId}
          selectedCity={selectedCity}
        />
      </div>

      {/* 左上角：城市筛选 */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          maxWidth: 'min(400px, calc(100vw - 40px))',
          zIndex: 10,
        }}
      >
        <CityFilterCard
          selectedCity={selectedCity}
          onCityChange={handleCityChange}
          provinceData={data?.provinces}
        />
      </div>

      {/* 左下角：地图控制 */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          zIndex: 10,
        }}
      >
        <MapControls
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onReset={handleReset}
        />
      </div>

      {/* 右上角：图例 */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '400px',
          zIndex: 10,
        }}
      >
        <MapLegend />
      </div>

      {/* 右侧：排行榜面板 */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          bottom: '20px',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <RankingPanel
          data={data}
          selectedCity={selectedCity}
          onItemClick={handleRankingItemClick}
          activePointId={activePointId}
        />
      </div>

      {/* 点位详情弹窗 */}
      <PointDetailModal
        point={selectedPoint}
        visible={detailModalVisible}
        onClose={handleCloseDetailModal}
      />
    </div>
  );
};

export default MapView;
