import React from 'react';
import { Space, Button, Avatar, Tooltip, Badge, Input } from 'antd';
import {
  SearchOutlined,
  BellOutlined,
  LaptopOutlined,
  MobileOutlined,
  TabletOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import './index.css';

interface AppHeaderProps {
  onMenuClick?: () => void;
}

/**
 * 新视顶部导航栏
 * Neo-Chinese Tech Luxury Aesthetic
 *
 * 设计特色：
 * - 48px 精致高度，比标准更紧凑
 * - 品牌名"新视"使用玉绿色，象征新生与洞察
 * - VIP 按钮采用金色渐变，呼应传统金箔工艺
 * - 图标组采用统一 16px 尺寸，保持视觉节奏
 */
export const AppHeader: React.FC<AppHeaderProps> = ({ onMenuClick }) => {
  return (
    <div className="app-header">
      {/* 左侧：品牌 Logo + 面包屑 */}
      <div className="header-left">
        <div className="logo-section">
          <span className="brand-name">新视</span>
          <span className="brand-subtitle">Video Discovery</span>
        </div>
        <div className="breadcrumb-section">
          <MenuOutlined className="breadcrumb-icon" />
          <span className="breadcrumb-text">地域找号</span>
        </div>
      </div>

      {/* 右侧：功能按钮组 */}
      <div className="header-right">
        <Space size="middle" align="center">
          {/* 功能地图按钮 - 品牌绿主题 */}
          <Button type="primary" className="feature-map-btn">
            <span className="btn-icon">🗺️</span>
            <span className="btn-text">功能地图</span>
          </Button>

          {/* 图标按钮组 - 统一风格 */}
          <div className="icon-button-group">
            <Tooltip title="搜索" placement="bottom">
              <Button type="text" icon={<SearchOutlined />} className="icon-btn" />
            </Tooltip>
            <Tooltip title="电脑端" placement="bottom">
              <Button type="text" icon={<LaptopOutlined />} className="icon-btn" />
            </Tooltip>
            <Tooltip title="移动端" placement="bottom">
              <Button type="text" icon={<MobileOutlined />} className="icon-btn" />
            </Tooltip>
            <Tooltip title="平板端" placement="bottom">
              <Button type="text" icon={<TabletOutlined />} className="icon-btn" />
            </Tooltip>
          </div>

          {/* 积分显示 - 橙色强调 */}
          <div className="credits-display">
            <span className="credits-icon">💰</span>
            <span className="credits-value">0</span>
          </div>

          {/* 消息通知 */}
          <Badge count={0} showZero={false} offset={[-4, 4]}>
            <Tooltip title="消息通知" placement="bottom">
              <Button type="text" icon={<BellOutlined />} className="icon-btn notification-btn" />
            </Tooltip>
          </Badge>

          {/* 用户头像 - 带微妙光晕 */}
          <Tooltip title="个人中心" placement="bottomRight">
            <Avatar
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=xinshi"
              size={32}
              className="user-avatar"
            />
          </Tooltip>

          {/* 开通 VIP - 金色渐变特效 */}
          <Button className="vip-btn">
            <span className="vip-icon">👑</span>
            <span className="vip-text">开通VIP</span>
          </Button>

          {/* 新榜品牌标识 */}
          <div className="newrank-brand">
            <span className="brand-text">新榜</span>
          </div>
        </Space>
      </div>
    </div>
  );
};
