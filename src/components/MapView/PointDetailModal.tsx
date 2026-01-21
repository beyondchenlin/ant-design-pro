/**
 * PointDetailModal 组件
 * 点位详情弹窗
 * Neo-Chinese Tech Luxury Aesthetic
 *
 * 设计元素：
 * - 玉石质感的卡片
 * - 流光边框装饰
 * - 优雅的信息层次
 */

import React from 'react';
import { Modal, Descriptions, Tag } from 'antd';
import { EnvironmentOutlined, UserOutlined, AimOutlined } from '@ant-design/icons';
import type { PointDetailModalProps } from '@/types/map';
import { mapColors } from '@/config/mapColors';

/**
 * PointDetailModal 组件
 */
export const PointDetailModal: React.FC<PointDetailModalProps> = ({
  point,
  visible,
  onClose,
}) => {
  if (!point) return null;

  return (
    <Modal
      title={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            color: mapColors.text.primary,
          }}
        >
          {/* 装饰性脉冲点 */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                background: mapColors.accent.base,
                boxShadow: `0 0 16px ${mapColors.accent.glow}`,
                animation: 'modalPulse 2s infinite',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#fff',
              }}
            />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '17px', letterSpacing: '0.5px' }}>
              用户详情
            </div>
            <div
              style={{
                fontSize: '11px',
                color: mapColors.text.tertiary,
                marginTop: '2px',
                letterSpacing: '0.5px',
              }}
            >
              USER DETAILS
            </div>
          </div>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={640}
      centered
      styles={{
        mask: {
          backdropFilter: 'blur(8px)',
          background: 'rgba(15, 22, 41, 0.8)',
        },
        content: {
          background: `linear-gradient(145deg, rgba(15, 22, 41, 0.98), rgba(26, 35, 50, 0.95))`,
          border: `1px solid ${mapColors.legend.border}`,
          borderRadius: '20px',
          boxShadow: `
            0 16px 64px rgba(0, 0, 0, 0.6),
            inset 0 1px 0 rgba(255, 255, 255, 0.05)
          `,
          overflow: 'hidden',
        },
        header: {
          background: 'transparent',
          borderBottom: `1px solid ${mapColors.legend.border}`,
          padding: '24px 28px',
        },
        body: {
          padding: '28px',
        },
      }}
    >
      {/* 装饰性背景纹理 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '200px',
          height: '200px',
          background: `radial-gradient(circle at 100% 0%, ${mapColors.accent.glow} 0%, transparent 60%)`,
          opacity: 0.08,
          pointerEvents: 'none',
        }}
      />

      {/* 基本信息 */}
      <Descriptions
        column={1}
        labelStyle={{
          color: mapColors.text.secondary,
          fontWeight: 600,
          width: '120px',
          fontSize: '13px',
        }}
        contentStyle={{
          color: mapColors.text.primary,
          fontWeight: 400,
          fontSize: '14px',
        }}
        style={{
          marginBottom: '24px',
        }}
      >
        <Descriptions.Item
          label={
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <UserOutlined style={{ fontSize: '16px', color: mapColors.primary.base }} />
              用户名称
            </span>
          }
        >
          <span style={{ fontSize: '16px', fontWeight: 700, letterSpacing: '0.3px' }}>
            {point.name}
          </span>
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <EnvironmentOutlined style={{ fontSize: '16px', color: mapColors.accent.base }} />
              所在地区
            </span>
          }
        >
          <Tag
            style={{
              borderRadius: '16px',
              padding: '6px 16px',
              fontSize: '14px',
              fontWeight: 600,
              border: `1px solid ${mapColors.primary.base}`,
              background: `linear-gradient(135deg, ${mapColors.primary.surface}, rgba(82, 196, 26, 0.1))`,
              color: mapColors.primary.base,
              boxShadow: `0 0 12px ${mapColors.primary.glow}`,
            }}
          >
            {point.province}
          </Tag>
        </Descriptions.Item>

        <Descriptions.Item label="详细地址">
          <div
            style={{
              fontSize: '14px',
              lineHeight: '1.7',
              color: mapColors.text.secondary,
              padding: '8px 12px',
              background: 'rgba(82, 196, 26, 0.05)',
              borderRadius: '8px',
              border: `1px solid rgba(82, 196, 26, 0.2)`,
            }}
          >
            {point.address}
          </div>
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AimOutlined style={{ fontSize: '16px', color: mapColors.text.tertiary }} />
              坐标位置
            </span>
          }
        >
          <div
            style={{
              fontFamily: 'Consolas, Monaco, monospace',
              fontSize: '13px',
              color: mapColors.text.secondary,
              background: mapColors.map.landFill,
              padding: '8px 14px',
              borderRadius: '8px',
              display: 'inline-block',
              border: `1px solid ${mapColors.legend.border}`,
              letterSpacing: '0.5px',
            }}
          >
            [{point.coordinates[0].toFixed(6)}, {point.coordinates[1].toFixed(6)}]
          </div>
        </Descriptions.Item>
      </Descriptions>

      {/* 装饰性分隔线 */}
      <div
        style={{
          height: '2px',
          background: `linear-gradient(90deg, transparent, ${mapColors.primary.base}, ${mapColors.accent.base}, transparent)`,
          margin: '24px 0',
          opacity: 0.4,
          borderRadius: '1px',
        }}
      />

      {/* 统计信息（预留） */}
      <div
        style={{
          display: 'flex',
          gap: '18px',
          justifyContent: 'space-around',
        }}
      >
        <div
          style={{
            flex: 1,
            textAlign: 'center',
            padding: '20px',
            background: `linear-gradient(135deg, ${mapColors.primary.surface}, rgba(82, 196, 26, 0.08))`,
            borderRadius: '14px',
            border: `1px solid ${mapColors.primary.base}`,
            boxShadow: `0 0 16px ${mapColors.primary.glow}`,
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = `0 4px 20px ${mapColors.primary.glow}`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = `0 0 16px ${mapColors.primary.glow}`;
          }}
        >
          <div
            style={{
              fontSize: '28px',
              fontWeight: 700,
              color: mapColors.primary.base,
              marginBottom: '6px',
              letterSpacing: '1px',
            }}
          >
            --
          </div>
          <div
            style={{
              fontSize: '12px',
              color: mapColors.text.secondary,
              fontWeight: 500,
              letterSpacing: '0.5px',
            }}
          >
            活跃度
          </div>
        </div>

        <div
          style={{
            flex: 1,
            textAlign: 'center',
            padding: '20px',
            background: `linear-gradient(135deg, ${mapColors.accent.surface}, rgba(255, 122, 0, 0.12))`,
            borderRadius: '14px',
            border: `1px solid ${mapColors.accent.base}`,
            boxShadow: `0 0 16px ${mapColors.accent.glow}`,
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = `0 4px 20px ${mapColors.accent.glow}`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = `0 0 16px ${mapColors.accent.glow}`;
          }}
        >
          <div
            style={{
              fontSize: '28px',
              fontWeight: 700,
              color: mapColors.accent.base,
              marginBottom: '6px',
              letterSpacing: '1px',
            }}
          >
            --
          </div>
          <div
            style={{
              fontSize: '12px',
              color: mapColors.text.secondary,
              fontWeight: 500,
              letterSpacing: '0.5px',
            }}
          >
            贡献值
          </div>
        </div>
      </div>

      {/* 脉冲动画 */}
      <style>
        {`
          @keyframes modalPulse {
            0%, 100% {
              opacity: 1;
              transform: scale(1);
            }
            50% {
              opacity: 0.6;
              transform: scale(1.3);
            }
          }
        `}
      </style>
    </Modal>
  );
};

export default PointDetailModal;
