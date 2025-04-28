import {
  ProFormField,
  type ProFormFieldProps,
} from '@ant-design/pro-components';
import { InputNumber, Select, Space } from 'antd';
import { forwardRef } from 'react';

export type ProtocolSelectValue = {
  protocol: number;
  port: number;
  remark?: string;
};

export type ProtocolSelectProps = {
  value?: ProtocolSelectValue;
  onChange?: (value: ProtocolSelectValue) => void;
};

const ProtocolSelect: React.FC<ProtocolSelectProps> = ({
  value = { protocol: 1, port: 8000 },
  onChange = () => {},
}) => {
  return (
    <Space>
      <Select
        style={{ width: 100 }}
        options={[
          { label: 'HTTP', value: 0 },
          { label: 'gRPC', value: 1 },
        ]}
        value={value.protocol}
        onChange={(newVal) => {
          onChange({ ...value, protocol: newVal });
        }}
      />
      <InputNumber
        min={0}
        max={65535}
        value={value.port}
        onChange={(newVal) => {
          onChange({ ...value, port: newVal || 0 });
        }}
      />
    </Space>
  );
};

const ProFormProtocolSelectRender: React.ForwardRefRenderFunction<
  any,
  ProFormFieldProps
> = ({ fieldProps, proFieldProps, ...rest }, ref) => {
  return (
    <ProFormField
      ref={ref}
      fieldProps={{
        ...fieldProps,
      }}
      filedConfig={{
        defaultProps: {
          width: '100%',
        },
      }}
      proFieldProps={proFieldProps}
      {...rest}
    >
      <ProtocolSelect />
    </ProFormField>
  );
};

export default forwardRef(ProFormProtocolSelectRender);
