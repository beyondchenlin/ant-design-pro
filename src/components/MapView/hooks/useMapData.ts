/**
 * useMapData Hook
 * 加载和管理地图数据
 * Neo-Chinese Tech Luxury Aesthetic
 */

import { useState, useEffect, useCallback } from 'react';
import type { MapData, UseMapDataReturn } from '@/types/map';

// 直接导入 JSON 数据
import mapPointsData from '@/data/map_points.json';

/**
 * 地图数据加载 Hook
 * @returns 地图数据、加载状态、错误信息和刷新函数
 */
export function useMapData(): UseMapDataReturn {
  const [data, setData] = useState<MapData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // 模拟异步加载（实际项目中可能从 API 获取）
      await new Promise(resolve => setTimeout(resolve, 300));

      // 处理并验证数据
      const processedData: MapData = {
        total_count: mapPointsData.total_count || 0,
        province_count: mapPointsData.province_count || 0,
        points: (mapPointsData.points || []).map((point: any, index: number) => ({
          id: point.id || `point-${index}`,
          name: point.name || '',
          address: point.address || '',
          province: point.province || '',
          coordinates: point.coordinates || [0, 0],
          value: point.value || [...(point.coordinates || [0, 0]), 1],
        })),
        provinces: mapPointsData.provinces || {},
      };

      setData(processedData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('加载地图数据失败'));
    } finally {
      setLoading(false);
    }
  }, []);

  // 初始加载
  useEffect(() => {
    loadData();
  }, [loadData]);

  // 刷新函数
  const refetch = useCallback(async () => {
    await loadData();
  }, [loadData]);

  return {
    data,
    loading,
    error,
    refetch,
  };
}

export default useMapData;
