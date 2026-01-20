import React, { useState } from 'react';
import { Layout, ConfigProvider } from 'antd';
import { AppHeader } from '@/components/AppHeader';
import { AppSider } from '@/components/AppSider';
import { theme } from '@/config/theme';
import '@/styles/global.css';
import './index.css';

const { Content } = Layout;

/**
 * 懒人同城号主布局
 * Neo-Chinese Tech Luxury Aesthetic
 *
 * 设计理念：
 * - 三栏布局：左侧导航 + 中间内容 + 右侧面板
 * - 流畅的动画过渡
 * - 精致的阴影和层次
 */
export default function IndexPage() {
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

          {/* 中间内容区域 */}
          <Content className="app-content">
            <div className="demo-container">
              <div className="demo-hero">
                <h1 className="demo-title">
                  <span className="title-main">懒人同城号</span>
                  <span className="title-sub">Local Account Discovery Platform</span>
                </h1>
                <p className="demo-subtitle">
                  Neo-Chinese Tech Luxury Aesthetic
                </p>
                <div className="demo-description">
                  <p>基于 Ant Design Pro 的同城号发现平台</p>
                  <p>融合现代科技与中国传统美学</p>
                </div>
              </div>

              {/* 设计特色展示 */}
              <div className="feature-grid">
                <div className="feature-card feature-card-primary">
                  <div className="feature-icon">🎨</div>
                  <h3 className="feature-title">品牌色彩系统</h3>
                  <p className="feature-desc">
                    玉绿色象征生长机遇<br />
                    琥珀橙象征收获成就
                  </p>
                  <div className="color-palette">
                    <div className="color-swatch" style={{ background: '#52c41a' }}>
                      <span className="color-label">Primary</span>
                    </div>
                    <div className="color-swatch" style={{ background: '#ff7a00' }}>
                      <span className="color-label">Accent</span>
                    </div>
                  </div>
                </div>

                <div className="feature-card feature-card-accent">
                  <div className="feature-icon">⭐</div>
                  <h3 className="feature-title">六角星标记</h3>
                  <p className="feature-desc">
                    源自中国传统吉祥符号<br />
                    带脉冲动画和发光效果
                  </p>
                  <div className="marker-demo">
                    <div className="marker-item">
                      <div style={{ width: 24, height: 24, background: '#52c41a', clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}></div>
                      <span>默认</span>
                    </div>
                    <div className="marker-item">
                      <div style={{ width: 28, height: 28, background: '#73d13d', clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}></div>
                      <span>悬停</span>
                    </div>
                    <div className="marker-item">
                      <div style={{ width: 32, height: 32, background: '#ff7a00', clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', animation: 'pulse 1.5s infinite' }}></div>
                      <span>选中</span>
                    </div>
                  </div>
                </div>

                <div className="feature-card feature-card-vip">
                  <div className="feature-icon">👑</div>
                  <h3 className="feature-title">VIP 尊贵体验</h3>
                  <p className="feature-desc">
                    金色渐变呼应传统金箔<br />
                    营造尊贵感与价值感
                  </p>
                  <div className="vip-demo">
                    <button className="vip-button">
                      <span className="vip-icon">👑</span>
                      <span>开通VIP</span>
                    </button>
                  </div>
                </div>

                <div className="feature-card feature-card-menu">
                  <div className="feature-icon">📱</div>
                  <h3 className="feature-title">精致交互</h3>
                  <p className="feature-desc">
                    父级展开态玉绿色<br />
                    子项选中态琥珀橙
                  </p>
                  <div className="menu-demo">
                    <div className="menu-item menu-item-parent">
                      <span className="menu-dot" style={{ background: '#52c41a' }}></span>
                      <span>父级菜单</span>
                    </div>
                    <div className="menu-item menu-item-child">
                      <span className="menu-bar" style={{ background: '#ff7a00' }}></span>
                      <span>子项选中</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 技术栈 */}
              <div className="tech-stack">
                <h2 className="section-title">技术栈</h2>
                <div className="tech-grid">
                  <div className="tech-item">
                    <span className="tech-name">React 18</span>
                    <span className="tech-badge">Frontend</span>
                  </div>
                  <div className="tech-item">
                    <span className="tech-name">Ant Design Pro 5.x</span>
                    <span className="tech-badge">UI Framework</span>
                  </div>
                  <div className="tech-item">
                    <span className="tech-name">TypeScript</span>
                    <span className="tech-badge">Type Safety</span>
                  </div>
                  <div className="tech-item">
                    <span className="tech-name">高德地图</span>
                    <span className="tech-badge">Map Service</span>
                  </div>
                </div>
              </div>

              {/* 设计原则 */}
              <div className="design-principles">
                <h2 className="section-title">设计原则</h2>
                <div className="principles-grid">
                  <div className="principle-item">
                    <div className="principle-number">01</div>
                    <h4>文化融合</h4>
                    <p>将中国传统美学与现代科技完美结合</p>
                  </div>
                  <div className="principle-item">
                    <div className="principle-number">02</div>
                    <h4>精致细腻</h4>
                    <p>每个像素都经过精心设计和打磨</p>
                  </div>
                  <div className="principle-item">
                    <div className="principle-number">03</div>
                    <h4>流畅动效</h4>
                    <p>自然的过渡动画提升用户体验</p>
                  </div>
                  <div className="principle-item">
                    <div className="principle-number">04</div>
                    <h4>层次分明</h4>
                    <p>清晰的视觉层次引导用户注意力</p>
                  </div>
                </div>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
