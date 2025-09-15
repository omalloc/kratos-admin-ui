import * as postService from '@/services/console/post';
import { mergeData } from '@/utils/pagination';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import {
  ActionType,
  ModalForm,
  PageContainer,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProTable,
  TableDropdown,
  type ProColumns,
} from '@ant-design/pro-components';
import { App, Badge, Button, Space, Tag, Typography } from 'antd';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';

type Post = {
  id?: string;
  post_id: string;
  title: string;
  body: string;
  tags?: string[];
  type: number;
  status: number;
  created_by?: string;
  created_at: string;
  updated_at: string;
};

type PostModalProps = {
  open: boolean;
  onCancel?: () => void;
  onOk?: () => void;
  editing?: boolean;
  initialValues?: Partial<Post>;
};

const PostModal: React.FC<PostModalProps> = ({ open, onCancel, onOk, editing = false, initialValues }) => {
  return (
    <ModalForm<Post>
      open={open}
      title={editing ? '编辑文章' : '新建文章'}
      width={800}
      modalProps={{
        destroyOnHidden: true,
        onCancel,
      }}
      initialValues={initialValues}
      onFinish={async (values) => {
        try {
          // 处理标签数据
          const tags = values.tags || [];
          const formData = {
            ...values,
            tags: Array.isArray(tags)
              ? tags
              : String(tags)
                  .split(',')
                  .map((tag: string) => tag.trim())
                  .filter(Boolean),
          };

          if (editing && values.post_id) {
            await postService.postUpdatePost({ post_id: values.post_id }, formData as API.UpdatePostRequest);
          } else {
            await postService.postCreatePost(formData as API.CreatePostRequest);
          }
          onOk?.();
          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
      }}
    >
      <ProFormText name="post_id" hidden />
      <ProFormText
        name="title"
        label="文章标题"
        rules={[{ required: true, message: '请输入文章标题' }]}
        placeholder="请输入文章标题"
      />
      <ProFormTextArea
        name="body"
        label="文章内容"
        rules={[{ required: true, message: '请输入文章内容' }]}
        fieldProps={{
          rows: 8,
          placeholder: '请输入文章内容',
        }}
      />
      <ProFormSelect
        name="tags"
        label="标签"
        mode="tags"
        placeholder="请输入标签，回车确认"
        fieldProps={{
          tokenSeparators: [',', ' '],
        }}
      />
      <ProFormRadio.Group
        name="type"
        label="文章类型"
        options={[
          { label: '文章', value: 1 },
          { label: '公告', value: 2 },
          { label: '动态', value: 3 },
        ]}
        rules={[{ required: true, message: '请选择文章类型' }]}
      />
      <ProFormRadio.Group
        name="status"
        label="状态"
        options={[
          { label: '草稿', value: 0 },
          { label: '已发布', value: 1 },
          { label: '已下架', value: 2 },
        ]}
        rules={[{ required: true, message: '请选择状态' }]}
      />
    </ModalForm>
  );
};

const PostsPage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { message } = App.useApp();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<Post>>();

  const handleAdd = () => {
    setEditing(false);
    setCurrentPost({
      type: 1,
      status: 0,
      tags: [],
    });
    setOpen(true);
  };

  const handleEdit = async (record: Post) => {
    try {
      // 获取完整的文章信息
      const res = await postService.postGetPost({ post_id: record.post_id });
      setEditing(true);
      setCurrentPost(res.data);
      setOpen(true);
    } catch (error) {
      message.error('获取文章详情失败');
    }
  };

  const handleView = async (record: Post) => {
    try {
      const res = await postService.postGetPost({ post_id: record.post_id });
      // 这里可以打开一个查看模态框，暂时用消息提示
      message.info('文章详情功能待实现');
    } catch (error) {
      message.error('获取文章详情失败');
    }
  };

  const handleDelete = async (post_id: string) => {
    try {
      await postService.postDeletePost({ post_id });
      message.success('删除成功');
      actionRef.current?.reload();
    } catch (error) {
      message.error('删除失败');
    }
  };

  const handleUpdateStatus = async (post_id: string, status: number) => {
    try {
      await postService.postUpdatePost({ post_id }, { status } as API.UpdatePostRequest);
      message.success('状态更新成功');
      actionRef.current?.reload();
    } catch (error) {
      message.error('状态更新失败');
    }
  };

  const getTypeText = (type: number) => {
    const typeMap: Record<number, string> = {
      1: '文章',
      2: '公告',
      3: '动态',
    };
    return typeMap[type] || '未知';
  };

  const getStatusColor = (status: number) => {
    const colorMap: Record<number, any> = {
      0: 'default', // 草稿
      1: 'processing', // 已发布
      2: 'error', // 已下架
    };
    return colorMap[status] || 'default';
  };

  const getStatusText = (status: number) => {
    const statusMap: Record<number, string> = {
      0: '草稿',
      1: '已发布',
      2: '已下架',
    };
    return statusMap[status] || '未知';
  };

  const columns: ProColumns<Post>[] = [
    {
      dataIndex: 'title',
      title: '文章标题',
      width: 300,
      ellipsis: true,
      render: (dom, record) => (
        <Space direction="vertical" size={0}>
          <Typography.Text strong>{dom}</Typography.Text>
          <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
            ID: {record.post_id}
          </Typography.Text>
        </Space>
      ),
    },
    {
      dataIndex: 'type',
      title: '类型',
      width: 100,
      valueEnum: {
        1: { text: '文章' },
        2: { text: '公告' },
        3: { text: '动态' },
      },
      render: (_, record) => <Tag color="blue">{getTypeText(record.type)}</Tag>,
    },
    {
      dataIndex: 'tags',
      title: '标签',
      width: 200,
      hideInSearch: true,
      render: (_, record) => (
        <Space wrap>
          {record.tags?.map((tag, index) => (
            <Tag key={index} color="geekblue" style={{ margin: '2px' }}>
              {tag}
            </Tag>
          )) || '-'}
        </Space>
      ),
    },
    {
      dataIndex: 'status',
      title: '状态',
      width: 100,
      valueEnum: {
        0: { text: '草稿', status: 'Default' },
        1: { text: '已发布', status: 'Processing' },
        2: { text: '已下架', status: 'Error' },
      },
      render: (_, record) => <Badge status={getStatusColor(record.status)} text={getStatusText(record.status)} />,
    },
    {
      dataIndex: 'created_by',
      title: '创建者',
      width: 120,
      hideInSearch: true,
    },
    {
      dataIndex: 'created_at',
      title: '创建时间',
      width: 160,
      hideInSearch: true,
      render: (_, record) => <Typography.Text>{dayjs(record.created_at).format('YYYY-MM-DD HH:mm')}</Typography.Text>,
    },
    {
      dataIndex: 'updated_at',
      title: '更新时间',
      width: 160,
      hideInSearch: true,
      render: (_, record) => <Typography.Text>{dayjs(record.updated_at).format('YYYY-MM-DD HH:mm')}</Typography.Text>,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 180,
      render: (_, record) => [
        <Button
          key="view"
          size="small"
          color="default"
          variant="link"
          icon={<EyeOutlined />}
          onClick={() => handleView(record)}
        >
          查看
        </Button>,
        <Button
          key="edit"
          size="small"
          color="primary"
          variant="link"
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
        >
          编辑
        </Button>,
        <TableDropdown
          key="actionGroup"
          onSelect={(key: string) => {
            if (key === 'delete') {
              handleDelete(record.post_id);
              return;
            }
            if (key === 'publish') {
              handleUpdateStatus(record.post_id, 1);
              return;
            }
            if (key === 'unpublish') {
              handleUpdateStatus(record.post_id, 2);
              return;
            }
            if (key === 'draft') {
              handleUpdateStatus(record.post_id, 0);
              return;
            }
          }}
          menus={[
            ...(record.status !== 1
              ? [
                  {
                    key: 'publish',
                    name: '发布',
                  },
                ]
              : []),
            ...(record.status === 1
              ? [
                  {
                    key: 'unpublish',
                    name: '下架',
                  },
                ]
              : []),
            ...(record.status !== 0
              ? [
                  {
                    key: 'draft',
                    name: '转为草稿',
                  },
                ]
              : []),
            {
              key: 'delete',
              name: (
                <span style={{ color: 'red' }}>
                  <DeleteOutlined style={{ marginRight: '4px' }} />
                  删除
                </span>
              ),
            },
          ]}
        >
          <Button size="small" color="primary" variant="link">
            更多 <span className="a-icon-down" />
          </Button>
        </TableDropdown>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<Post>
        actionRef={actionRef}
        rowKey="post_id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button key="add" type="primary" onClick={handleAdd}>
            新建文章
          </Button>,
        ]}
        request={async (params) => {
          const res = await postService.postListPost(mergeData(params));
          return {
            data: (res.data || []).map((item: API.PostInfo) => ({
              ...item,
              id: item.id || item.post_id,
              post_id: item.post_id || '',
              title: item.title || '',
              body: item.body || '',
              tags: item.tags || [],
              type: item.type || 1,
              status: item.status || 0,
              created_by: item.created_by || '',
              created_at: item.created_at || '',
              updated_at: item.updated_at || '',
            })) as Post[],
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

      <PostModal
        open={open}
        editing={editing}
        initialValues={currentPost}
        onCancel={() => {
          setOpen(false);
          setEditing(false);
          setCurrentPost(undefined);
        }}
        onOk={() => {
          setOpen(false);
          setEditing(false);
          setCurrentPost(undefined);
          actionRef.current?.reload();
        }}
      />
    </PageContainer>
  );
};

export default PostsPage;
