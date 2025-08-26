import * as crontabService from '@/services/console/crontab';
import { mergeData } from '@/utils/pagination';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
  ActionType,
  ModalForm,
  PageContainer,
  ProFormText,
  ProFormTextArea,
  ProTable,
  TableDropdown,
  type ProColumns,
} from '@ant-design/pro-components';
import { App, Button, Popconfirm, Space, Tag, Tooltip, Typography } from 'antd';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';

type Crontab = API.CrontabInfo;

const CrontabModal: React.FC<{
  open: boolean;
  onCancel?: () => void;
  onOk?: () => void;
  editing?: boolean;
  initialValues?: Partial<Crontab>;
}> = ({ open, onCancel, onOk, editing = false, initialValues }) => {
  const { message } = App.useApp();

  // Cron 表达式验证
  const validateCronExpression = (_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error('请输入 Cron 表达式'));
    }

    // 基本的 Cron 表达式格式验证（5或6个字段）
    const cronRegex =
      /^(\*|([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])|\*\/([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])) (\*|([0-9]|1[0-9]|2[0-3])|\*\/([0-9]|1[0-9]|2[0-3])) (\*|([1-9]|1[0-9]|2[0-9]|3[0-1])|\*\/([1-9]|1[0-9]|2[0-9]|3[0-1])) (\*|([1-9]|1[0-2])|\*\/([1-9]|1[0-2])) (\*|[0-6]|\*\/[0-6])( (\*|([0-9]{4})|\*\/([0-9]{4})))?$/;

    if (!cronRegex.test(value.trim())) {
      return Promise.reject(new Error('请输入有效的 Cron 表达式格式，例如：0 0 * * *'));
    }

    return Promise.resolve();
  };

  return (
    <ModalForm<Crontab>
      open={open}
      title={editing ? '编辑定时任务' : '新建定时任务'}
      width={600}
      modalProps={{
        destroyOnHidden: true,
        onCancel,
      }}
      initialValues={initialValues}
      onFinish={async (values) => {
        try {
          if (editing && values.id) {
            await crontabService.crontabUpdateCrontab({ id: values.id }, values as API.UpdateCrontabRequest);
            message.success('更新成功');
          } else {
            await crontabService.crontabCreateCrontab(values as API.CreateCrontabRequest);
            message.success('创建成功');
          }
          onOk?.();
          return true;
        } catch (error) {
          console.error(error);
          message.error(editing ? '更新失败' : '创建失败');
          return false;
        }
      }}
    >
      <ProFormText name="uid" hidden />

      <ProFormText
        name="name"
        label="任务名称"
        rules={[{ required: true, message: '请输入任务名称' }]}
        placeholder="请输入任务名称"
      />

      <ProFormText
        name="expr"
        label="Cron 表达式"
        rules={[{ validator: validateCronExpression }]}
        placeholder="例如：0 0 * * * (每天午夜执行)"
        extra="格式：分钟 小时 日期 月份 星期，支持通配符 * 和间隔符号 /"
      />

      <ProFormText
        name="action"
        label="任务动作"
        rules={[{ required: true, message: '请输入任务动作' }]}
        placeholder="请输入要执行的任务动作或命令"
      />

      <ProFormTextArea
        name="describe"
        label="任务描述"
        placeholder="请输入任务描述"
        fieldProps={{
          rows: 3,
        }}
      />
    </ModalForm>
  );
};

const CrontabPage: React.FC = () => {
  const { message } = App.useApp();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentCrontab, setCurrentCrontab] = useState<Partial<Crontab>>();
  const actionRef = useRef<ActionType>();

  const handleAdd = () => {
    setEditing(false);
    setCurrentCrontab(undefined);
    setOpen(true);
  };

  const handleEdit = (record: Crontab) => {
    setEditing(true);
    setCurrentCrontab(record);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await crontabService.crontabDeleteCrontab({ id });
      message.success('删除成功');
      actionRef.current?.reload();
    } catch (error) {
      message.error('删除失败');
    }
  };

  const columns: ProColumns<Crontab>[] = [
    {
      dataIndex: 'id',
      title: 'ID',
      width: 80,
      hideInSearch: true,
    },
    {
      dataIndex: 'name',
      title: '任务名称',
      width: 200,
      ellipsis: true,
      render: (dom, record) => (
        <Space direction="vertical" size={0}>
          <Tooltip title={record.describe}>
            <span>{dom}</span>
          </Tooltip>
          {record.describe && (
            <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
              {record.describe}
            </Typography.Text>
          )}
        </Space>
      ),
    },
    {
      dataIndex: 'expr',
      title: 'Cron 表达式',
      width: 150,
      hideInSearch: true,
      render: (text) => (
        <Tag color="blue" style={{ fontFamily: 'monospace' }}>
          {text}
        </Tag>
      ),
    },
    {
      dataIndex: 'action',
      title: '任务动作',
      ellipsis: true,
      hideInSearch: true,
      render: (text) => <Tag>{text}</Tag>,
    },
    {
      dataIndex: 'lastrun_at',
      title: '上次执行时间',
      width: 180,
      hideInSearch: true,
      render: (_, record) => {
        if (!record.lastrun_at) {
          return <Typography.Text type="secondary">未执行</Typography.Text>;
        }
        return (
          <Tooltip title={dayjs(record.lastrun_at).format('YYYY-MM-DD HH:mm:ss')}>
            <span>{dayjs(record.lastrun_at).format('MM-DD HH:mm')}</span>
          </Tooltip>
        );
      },
    },
    {
      dataIndex: 'created_at',
      title: '创建时间',
      width: 180,
      hideInSearch: true,
      render: (_, record) => {
        if (!record.created_at) {
          return <Typography.Text type="secondary">-</Typography.Text>;
        }
        return (
          <Tooltip title={dayjs(record.created_at).format('YYYY-MM-DD HH:mm:ss')}>
            <span>{dayjs(record.created_at).format('MM-DD HH:mm')}</span>
          </Tooltip>
        );
      },
    },
    {
      key: 'option',
      title: '操作',
      valueType: 'option',
      width: 150,
      render: (_, record) => [
        <a key="edit" onClick={() => handleEdit(record)}>
          <span style={{ userSelect: 'none' }}>
            <EditOutlined style={{ marginRight: '4px' }} />
            编辑
          </span>
        </a>,
        <TableDropdown
          key="actionGroup"
          onSelect={(key: string) => {
            if (key === 'delete') {
              // 将删除操作移到 Popconfirm 中处理
            }
          }}
          menus={[
            {
              key: 'delete',
              name: (
                <Popconfirm
                  title="确定要删除这个定时任务吗？"
                  onConfirm={() => handleDelete(record.id!)}
                  okText="确定"
                  cancelText="取消"
                >
                  <span style={{ color: 'red' }}>
                    <DeleteOutlined style={{ marginRight: '4px' }} />
                    删除
                  </span>
                </Popconfirm>
              ),
            },
          ]}
        />,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<Crontab>
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button key="add" type="primary" onClick={handleAdd}>
            新建定时任务
          </Button>,
        ]}
        request={async (params) => {
          const res = await crontabService.crontabListCrontab(mergeData(params));
          return {
            data: res.data || [],
            total: res.pagination?.total || 0,
            success: true,
          };
        }}
        columns={columns}
        rowClassName={(_, index) => {
          if (index % 2 === 0) {
            return '';
          }
          return 'a-table-row-striped-odd';
        }}
      />

      <CrontabModal
        open={open}
        editing={editing}
        initialValues={currentCrontab}
        onCancel={() => {
          setOpen(false);
          setEditing(false);
          setCurrentCrontab(undefined);
        }}
        onOk={() => {
          setOpen(false);
          setEditing(false);
          setCurrentCrontab(undefined);
          actionRef.current?.reload();
        }}
      />
    </PageContainer>
  );
};

export default CrontabPage;
