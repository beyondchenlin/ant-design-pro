/**
 * 地图相关类型定义
 * Neo-Chinese Tech Luxury Aesthetic
 */

/**
 * 单个地图点位数据
 */
export interface MapPoint {
  id?: string;
  name: string;
  address: string;
  province: string;
  coordinates: [number, number]; // [经度, 纬度]
  value: [number, number, number]; // [经度, 纬度, 权重值]
}

/**
 * 省份聚合数据
 */
export interface ProvinceData {
  count: number;
  names: string[];
  center: [number, number];
}

/**
 * 省份数据映射
 */
export type ProvinceDataMap = Record<string, ProvinceData>;

/**
 * 地图数据结构
 */
export interface MapData {
  total_count: number;
  province_count: number;
  points: MapPoint[];
  provinces: ProvinceDataMap;
}

/**
 * MapView 组件属性
 */
export interface MapViewProps {
  onPointClick?: (point: MapPoint) => void;
  onCityChange?: (city: string) => void;
  selectedCity?: string;
  activePointId?: string;
  hoveredPointId?: string;
}

/**
 * EChartsMap 组件属性
 */
export interface EChartsMapProps {
  data: MapData | null;
  onReady?: (instance: any) => void;
  onPointClick?: (point: MapPoint) => void;
  activePointId?: string;
  hoveredPointId?: string;
  selectedCity?: string;
}

/**
 * 城市筛选卡片属性
 */
export interface CityFilterCardProps {
  selectedCity?: string;
  onCityChange?: (city: string) => void;
  provinceData?: ProvinceDataMap;
}

/**
 * 地图控制组件属性
 */
export interface MapControlsProps {
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onReset?: () => void;
}

/**
 * 图例组件属性
 */
export interface MapLegendProps {
  items?: LegendItem[];
}

/**
 * 图例项
 */
export interface LegendItem {
  color: string;
  label: string;
  isActive?: boolean;
}

/**
 * 点位详情弹窗属性
 */
export interface PointDetailModalProps {
  visible: boolean;
  point: MapPoint | null;
  onClose: () => void;
  sameProvinceUsers?: string[];
}

/**
 * 城市配置
 */
export interface CityConfig {
  code: string;
  name: string;
  center?: [number, number];
  zoom?: number;
}

/**
 * 热门城市列表
 */
export const HOT_CITIES: CityConfig[] = [
  { code: 'all', name: '全国', center: [104.114129, 37.550339], zoom: 1.2 },
  { code: '广东省', name: '广东', center: [113.280637, 23.125178], zoom: 6 },
  { code: '山东省', name: '山东', center: [117.000923, 36.675807], zoom: 6 },
  { code: '河南省', name: '河南', center: [113.665412, 34.757975], zoom: 6 },
  { code: '江苏省', name: '江苏', center: [118.767413, 32.041544], zoom: 6 },
  { code: '河北省', name: '河北', center: [114.502461, 38.045474], zoom: 6 },
  { code: '四川省', name: '四川', center: [104.065735, 30.659462], zoom: 6 },
  { code: '浙江省', name: '浙江', center: [120.153576, 30.287459], zoom: 6 },
  { code: '湖北省', name: '湖北', center: [114.298572, 30.584355], zoom: 6 },
  { code: '湖南省', name: '湖南', center: [112.982279, 28.19409], zoom: 6 },
];

/**
 * 地图交互 Hook 返回类型
 */
export interface UseMapInteractionReturn {
  mapInstance: any | null;
  setMapInstance: (instance: any) => void;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  flyToPoint: (lng: number, lat: number, zoom?: number) => void;
  highlightPoint: (pointId: string | null) => void;
  resetView: () => void;
}

/**
 * 地图数据 Hook 返回类型
 */
export interface UseMapDataReturn {
  data: MapData | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * 地图与排行榜联动 Hook 返回类型
 */
export interface UseMapRankingSyncReturn {
  activeAccountId: string | null;
  hoveredAccountId: string | null;
  handleMapMarkerClick: (point: MapPoint) => void;
  handleRankingItemClick: (point: MapPoint) => void;
  handleMapMarkerHover: (pointId: string | null) => void;
  handleRankingItemHover: (pointId: string | null) => void;
  clearSelection: () => void;
}
