import * as passportService from '@/services/console/passport';
import { LockOutlined, MobileOutlined, UserOutlined, WeiboCircleOutlined } from '@ant-design/icons';
import { LoginForm, ProFormCaptcha, ProFormCheckbox, ProFormText, setAlpha } from '@ant-design/pro-components';
import { useModel, useNavigate } from '@umijs/max';
import { App, Col, Row, Space, Tabs, theme } from 'antd';
import { useState, type CSSProperties } from 'react';

type LoginType = 'phone' | 'account';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const { token } = theme.useToken();
  const { message } = App.useApp();
  const { refresh } = useModel('@@initialState');
  const [loginType, setLoginType] = useState<LoginType>('account');

  const iconStyles: CSSProperties = {
    marginInlineStart: '16px',
    color: setAlpha(token.colorTextBase, 0.2),
    fontSize: '24px',
    verticalAlign: 'middle',
    cursor: 'pointer',
  };

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
            subTitle="全球最大的基友平台"
            actions={
              <Space>
                其他登录方式
                <WeiboCircleOutlined style={iconStyles} />
              </Space>
            }
            onFinish={async (values) => {
              console.log('提交登录信息', values);
              try {
                const res = await passportService.passportLogin(
                  {
                    username: values.username,
                    password: values.password,
                    auto_login: values.autoLogin,
                  },
                  {
                    responseInterceptors: [
                      (config: any) => {
                        console.log('响应拦截器', config);
                        const { authorization } = config.headers;
                        if (authorization) {
                          localStorage.setItem('token', authorization);
                          refresh();
                        }
                        return config;
                      },
                    ],
                  },
                );

                navigate('/admin');

                return true;
              } catch (err: any) {
                console.log('登录失败', err);
                message.info('登录失败', err);
                return false;
              }
            }}
          >
            <Tabs
              centered
              activeKey={loginType}
              onChange={(activeKey) => setLoginType(activeKey as LoginType)}
              items={[
                {
                  key: 'account',
                  label: '账号密码登录',
                },
                {
                  key: 'phone',
                  label: '手机号登录',
                },
              ]}
            />
            {loginType === 'account' && (
              <>
                <ProFormText
                  name="username"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={'prefixIcon'} />,
                  }}
                  placeholder={'用户名: admin or user'}
                  rules={[
                    {
                      required: true,
                      message: '请输入用户名!',
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
                  placeholder={'密码: ant.design'}
                  rules={[
                    {
                      required: true,
                      message: '请输入密码！',
                    },
                  ]}
                />
              </>
            )}
            {loginType === 'phone' && (
              <>
                <ProFormText
                  fieldProps={{
                    size: 'large',
                    prefix: <MobileOutlined className={'prefixIcon'} />,
                  }}
                  name="mobile"
                  placeholder={'手机号'}
                  rules={[
                    {
                      required: true,
                      message: '请输入手机号！',
                    },
                    {
                      pattern: /^1\d{10}$/,
                      message: '手机号格式错误！',
                    },
                  ]}
                />
                <ProFormCaptcha
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={'prefixIcon'} />,
                  }}
                  captchaProps={{
                    size: 'large',
                  }}
                  placeholder={'请输入验证码'}
                  captchaTextRender={(timing, count) => {
                    if (timing) {
                      return `${count} ${'获取验证码'}`;
                    }
                    return '获取验证码';
                  }}
                  name="captcha"
                  rules={[
                    {
                      required: true,
                      message: '请输入验证码！',
                    },
                  ]}
                  onGetCaptcha={async () => {
                    message.success('获取验证码成功！验证码为：1234');
                  }}
                />
              </>
            )}
            <div
              style={{
                marginBlockEnd: 24,
              }}
            >
              <ProFormCheckbox noStyle name="autoLogin">
                自动登录
              </ProFormCheckbox>
              <a
                style={{
                  float: 'right',
                }}
              >
                忘记密码
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

export default Login;
