# MapView 组件问题总结

## 当前状态

地图页面在 Ant Design Pro 框架中显示异常，布局错乱，地图不显示。

---

## 问题列表

### 1. 地图不显示

**现象**：ECharts 中国地图没有渲染出来，中间区域空白

**可能原因**：
- GeoJSON 数据加载失败
- ECharts geo 组件配置问题
- 地图注册失败

**相关文件**：
- `src/components/MapView/EChartsMap.tsx`
- `public/china.json` (GeoJSON 数据)

---

### 2. 布局完全错乱

**现象**：
- 区域筛选卡片：应该在左上角，但跑到了顶部
- 用户排行面板：应该在右侧，但跑到了底部
- 图例：位置不正确
- 地图控制按钮：位置偏移

**原因**：
- Ant Design Pro 框架使用 CSS Modules，会转换类名
- 添加的 `:global` 样式与框架原有样式产生冲突
- `!important` 覆盖导致布局计算出错

**相关文件**：
- `src/components/MapView/index.less` (新建的样式文件)
- `src/components/MapView/index.tsx` (改用 className)

---

### 3. CSS 样式冲突

**现象**：自定义样式在框架中不生效或产生冲突

**原因**：
- Ant Design Pro 默认使用 CSS Modules
- 全局样式 `:global` 与框架样式冲突
- Card 组件的 `headStyle`/`bodyStyle` 已废弃，改用 `styles` 属性

**相关文件**：
- `src/components/MapView/CityFilterCard.tsx`
- `src/components/MapView/RankingPanel.tsx`

---

### 4. 性能问题

**现象**：
- 独立页面 (`test-map.html`) 访问正常，拖动缩放流畅
- 框架中 (`/discover/map`) 访问时卡顿

**已尝试的优化**：
- 添加 `useMemo` 缓存 `filteredPoints`、`scatterData`、`option`
- 设置 `notMerge={false}` 和 `lazyUpdate={true}`

---

## 涉及的文件改动

| 文件 | 改动内容 | 状态 |
|------|----------|------|
| `src/components/MapView/index.less` | 新建，添加了 :global 样式 | 需要修复 |
| `src/components/MapView/index.tsx` | 改用 className 替代 inline style | 需要修复 |
| `src/components/MapView/CityFilterCard.tsx` | 改用 className，改 styles 属性 | 需要修复 |
| `src/components/MapView/RankingPanel.tsx` | 添加 className | 需要修复 |
| `src/components/MapView/EChartsMap.tsx` | 添加 useMemo 优化 | 可保留 |

---

## 建议修复方案

### 方案一：回退 CSS 改动

1. 删除 `index.less` 文件
2. 恢复 `index.tsx` 使用 inline style
3. 恢复 `CityFilterCard.tsx` 使用 inline style
4. 恢复 `RankingPanel.tsx` 使用 inline style
5. 保留 `EChartsMap.tsx` 的 useMemo 优化

### 方案二：使用 CSS Modules 正确方式

1. 将 `index.less` 改名为 `index.module.less`
2. 使用 `import styles from './index.module.less'`
3. 使用 `className={styles.mapViewContainer}` 方式引用

### 方案三：使用 styled-components 或 emotion

避免 CSS Modules 冲突，使用 CSS-in-JS 方案

---

## 独立测试页面

独立测试页面 `public/test-map.html` 可以正常显示地图，说明：
- GeoJSON 数据本身没问题
- ECharts 配置基本正确
- 问题出在框架集成层面

---

## 参考资料

- Ant Design Pro 文档：https://pro.ant.design/
- UMI Max 文档：https://umijs.org/
- ECharts 地图文档：https://echarts.apache.org/zh/option.html#geo
