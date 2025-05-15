import * as passportService from '@/services/console/passport';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { useNavigate } from '@umijs/max';
import { App, Col, Row, theme } from 'antd';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { token } = theme.useToken();
  const { message } = App.useApp();

  return (
    <div
      style={{
        backgroundColor: token.colorBgContainer,
        height: '100vh',
      }}
    >
      <Row style={{ height: '100%' }}>
        <Col sm={24} md={10} style={{ paddingTop: '80px' }}>
          <LoginForm
            logo="https://www.omalloc.com/static/media/logo.92f5ef81870d04a2028d19357a255d1b.svg"
            title="Kratos Admin"
            subTitle="注册新账号"
            onFinish={async (values) => {
              try {
                await passportService.passportRegister({
                  username: values.username,
                  password: values.password,
                  email: values.email,
                  nickname: values.nickname,
                });
                message.success('注册成功');
                navigate('/passport/login');
                return true;
              } catch (err: any) {
                console.error('注册失败', err);
                message.error('注册失败');
                return false;
              }
            }}
          >
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'} />,
              }}
              placeholder={'用户名'}
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <ProFormText
              name="nickname"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'} />,
              }}
              placeholder={'昵称'}
              rules={[
                {
                  required: true,
                  message: '请输入昵称!',
                },
              ]}
            />
            <ProFormText
              name="email"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'} />,
              }}
              placeholder={'电子邮箱'}
              rules={[
                {
                  required: true,
                  message: '请输入电子邮箱!',
                },
                {
                  type: 'email',
                  message: '请输入有效的电子邮箱地址!',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
                strengthText: '密码应包含数字、字母和特殊字符，长度至少为8个字符。',
                statusRender: (value) => {
                  const getStatus = () => {
                    if (value && value.length > 12) {
                      return 'ok';
                    }
                    if (value && value.length > 6) {
                      return 'pass';
                    }
                    return 'poor';
                  };
                  const status = getStatus();
                  if (status === 'pass') {
                    return <div style={{ color: token.colorWarning }}>强度：中</div>;
                  }
                  if (status === 'ok') {
                    return <div style={{ color: token.colorSuccess }}>强度：强</div>;
                  }
                  return <div style={{ color: token.colorError }}>强度：弱</div>;
                },
              }}
              placeholder={'密码'}
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
                {
                  min: 8,
                  message: '密码长度至少为8个字符！',
                },
              ]}
            />
            <ProFormText.Password
              name="re_password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
              }}
              placeholder={'确认密码'}
              rules={[
                {
                  required: true,
                  message: '请确认密码！',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('两次输入的密码不一致！'));
                  },
                }),
              ]}
            />
            <div
              style={{
                marginBlockEnd: 24,
              }}
            >
              <a
                style={{
                  float: 'right',
                }}
                onClick={() => navigate('/passport/login')}
              >
                已有账号？去登录
              </a>
            </div>
          </LoginForm>
        </Col>
        <Col sm={24} md={14}>
          <div
            style={{
              display: 'block',
              height: '100%',
              position: 'relative',
            }}
          >
            <img
              alt="Example"
              src="/images/login-bg.jpg"
              style={{
                height: '100%',
                objectFit: 'cover',
                position: 'absolute',
                width: '100%',
                zIndex: 10,
              }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
