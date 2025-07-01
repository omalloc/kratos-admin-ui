import { createFromIconfontCN } from '@ant-design/icons';

export const FontIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js', // 在 iconfont.cn 上生成
});

export const NodeTitle: React.FC<{ title: string; icon: string }> = ({ title, icon }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'start' }}>
      <span style={{ marginRight: '6px' }}>
        <FontIcon type={icon} />
      </span>
      <span>{title}</span>
    </div>
  );
};
