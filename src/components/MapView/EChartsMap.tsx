/**
 * EChartsMap 组件
 * 基于 ECharts 的中国地图可视化
 * Neo-Chinese Tech Luxury Aesthetic
 */

import React, { useEffect, useRef } from 'react';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { ScatterChart, EffectScatterChart, MapChart } from 'echarts/charts';
import {
  GeoComponent,
  TooltipComponent,
  VisualMapComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import type { EChartsMapProps, MapPoint } from '@/types/map';
import { mapColors, MARKER_SIZES, RIPPLE_CONFIG } from '@/config/mapColors';
import chinaGeoJSON from '@/data/chinaGeoJSON';

// 注册 ECharts 组件
echarts.use([
  ScatterChart,
  EffectScatterChart,
  MapChart,
  GeoComponent,
  TooltipComponent,
  VisualMapComponent,
  CanvasRenderer,
]);

// 注册中国地图
echarts.registerMap('china', chinaGeoJSON as any);

/**
 * EChartsMap 组件
 */
export const EChartsMap: React.FC<EChartsMapProps> = ({
  data,
  onReady,
  onPointClick,
  activePointId,
  hoveredPointId,
  selectedCity,
}) => {
  const chartRef = useRef<ReactEChartsCore>(null);

  // 处理点击事件
  const handleChartClick = (params: any) => {
    if (params.componentType === 'series' && params.seriesType === 'effectScatter') {
      const point = data?.points[params.dataIndex];
      if (point && onPointClick) {
        onPointClick(point);
      }
    }
  };

  // 准备散点数据
  const getScatterData = () => {
    if (!data?.points) return [];

    return data.points
      .filter((point) => {
        // 城市筛选
        if (selectedCity && selectedCity !== 'all') {
          return point.province === selectedCity;
        }
        return true;
      })
      .map((point) => ({
        name: point.name,
        value: point.value,
        itemStyle: {
          color:
            point.id === activePointId
              ? mapColors.nodes.selected
              : point.id === hoveredPointId
              ? mapColors.nodes.hover
              : mapColors.nodes.normal,
          shadowColor:
            point.id === activePointId
              ? mapColors.nodes.selectedGlow
              : point.id === hoveredPointId
              ? mapColors.nodes.hoverGlow
              : mapColors.nodes.normalGlow,
          shadowBlur: point.id === activePointId || point.id === hoveredPointId ? 20 : 10,
        },
      }));
  };

  // ECharts 配置
  const getOption = () => {
    return {
      backgroundColor: mapColors.map.background,
      tooltip: {
        trigger: 'item',
        backgroundColor: mapColors.tooltip.background,
        borderColor: mapColors.tooltip.border,
        borderWidth: 1,
        textStyle: {
          color: mapColors.text.primary,
          fontSize: 14,
        },
        formatter: (params: any) => {
          if (params.componentType === 'geo') {
            return `<div style="padding: 4px 8px;">
              <div style="font-weight: 600; margin-bottom: 4px;">${params.name}</div>
            </div>`;
          }
          if (params.componentType === 'series') {
            return `<div style="padding: 4px 8px;">
              <div style="font-weight: 600; margin-bottom: 4px; color: ${mapColors.accent.base};">
                ${params.name}
              </div>
              <div style="font-size: 12px; color: ${mapColors.text.secondary};">
                点击查看详情
              </div>
            </div>`;
          }
          return '';
        },
      },
      geo: {
        map: 'china',
        roam: true,
        aspectScale: 0.75, // 中国地图标准宽高比
        scaleLimit: {
          min: 1,
          max: 5,
        },
        zoom: selectedCity && selectedCity !== 'all' ? 1.5 : 1.2,
        center: selectedCity && selectedCity !== 'all' ? undefined : [104.114129, 37.550339],
        itemStyle: {
          areaColor: mapColors.map.landFill,
          borderColor: mapColors.map.landBorder,
          borderWidth: 1,
        },
        emphasis: {
          itemStyle: {
            areaColor: mapColors.map.provinceHover,
            borderColor: mapColors.primary.light,
            borderWidth: 2,
          },
          label: {
            show: true,
            color: mapColors.text.primary,
            fontSize: 14,
            fontWeight: 600,
          },
        },
        select: {
          itemStyle: {
            areaColor: mapColors.map.provinceSelected,
            borderColor: mapColors.accent.base,
            borderWidth: 2,
          },
          label: {
            show: true,
            color: mapColors.accent.base,
            fontSize: 16,
            fontWeight: 700,
          },
        },
      },
      series: [
        {
          name: '用户分布',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: getScatterData(),
          symbolSize: (val: any, params: any) => {
            const point = data?.points[params.dataIndex];
            if (point?.id === activePointId) return MARKER_SIZES.selected;
            if (point?.id === hoveredPointId) return MARKER_SIZES.hover;
            return MARKER_SIZES.normal;
          },
          showEffectOn: 'render',
          rippleEffect: {
            ...RIPPLE_CONFIG,
            color: mapColors.primary.glow,
          },
          label: {
            show: false,
          },
          emphasis: {
            scale: true,
            label: {
              show: true,
              position: 'top',
              color: mapColors.text.primary,
              fontSize: 12,
              fontWeight: 600,
              backgroundColor: mapColors.tooltip.background,
              padding: [4, 8],
              borderRadius: 4,
              borderColor: mapColors.primary.base,
              borderWidth: 1,
            },
          },
        },
      ],
    };
  };

  // 图表实例就绪回调
  useEffect(() => {
    if (chartRef.current && onReady) {
      const instance = chartRef.current.getEchartsInstance();
      onReady(instance);
    }
  }, [onReady]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: mapColors.map.backgroundGradient,
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: `0 8px 32px ${mapColors.primary.surface}`,
      }}
    >
      <ReactEChartsCore
        ref={chartRef}
        echarts={echarts}
        option={getOption()}
        style={{ width: '100%', height: '100%' }}
        notMerge={true}
        lazyUpdate={true}
        onEvents={{
          click: handleChartClick,
        }}
      />
    </div>
  );
};

export default EChartsMap;
