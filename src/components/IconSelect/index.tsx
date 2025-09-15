import { createFromIconfontCN } from '@ant-design/icons';
import { ProForm } from '@ant-design/pro-components';
import { Button, Col, Popover, Space } from 'antd';
import iconJson from './icon.json';

const IconList = iconJson.glyphs.map((item) => `${iconJson.css_prefix_text}${item.font_class}`);

const FontIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4221036_4blevxv17fb.js', // 在 iconfont.cn 上生成
});

export { FontIcon };

export type IconSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

const IconSelect: React.FC<IconSelectProps> = (props) => {
  return (
    <Popover
      placement="topLeft"
      content={
        <div style={{ width: '380px', height: '200px', overflow: 'auto' }}>
          <Space wrap>
            {IconList.map((item) => (
              <Button
                size="large"
                key={item}
                icon={<FontIcon type={item} />}
                type={props.value === item ? 'primary' : 'default'}
                onClick={() => props.onChange(item)}
              />
            ))}
          </Space>
        </div>
      }
    >
      <Button icon={<FontIcon type={props.value} />} />
    </Popover>
  );
};

const ProFormIconSelect: React.FC<any> = ({ fieldProps, colProps = {}, ...rest }) => {
  return (
    <Col {...(colProps || {})}>
      <ProForm.Item {...rest}>
        <IconSelect {...fieldProps} />
      </ProForm.Item>
    </Col>
  );
};

export default ProFormIconSelect;
