/**
 * 地域找号页面
 * 用户分布地图可视化
 */

import React, { useState } from 'react';
import { Layout, ConfigProvider } from 'antd';
import { AppHeader } from '@/components/AppHeader';
import { AppSider } from '@/components/AppSider';
import { MapView } from '@/components/MapView';
import { theme } from '@/config/theme';
import '@/styles/global.css';

const { Content } = Layout;

/**
 * 地域找号页面
 * 在主布局中嵌入地图组件
 */
export default function DiscoverMapPage() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ConfigProvider theme={theme}>
      <Layout className="app-layout">
        {/* 顶部导航栏 */}
        <AppHeader onMenuClick={() => setCollapsed(!collapsed)} />

        <Layout className="app-body">
          {/* 左侧菜单 */}
          <Layout.Sider
            width={240}
            collapsedWidth={64}
            collapsed={collapsed}
            className="app-layout-sider"
            theme="light"
          >
            <AppSider collapsed={collapsed} />
          </Layout.Sider>

          {/* 中间内容区域 - 地图 */}
          <Content
            className="app-content"
            style={{
              padding: 0,
              overflow: 'hidden',
            }}
          >
            <MapView />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
