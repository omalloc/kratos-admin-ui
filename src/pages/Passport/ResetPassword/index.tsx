import { passportSendResetPassword } from '@/services/console/passport';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { App, Button } from 'antd';
import { createStyles } from 'antd-style';
import { useState, useEffect } from 'react';

const useStyles = createStyles(({ token }) => ({
  actions: {
    marginBlockEnd: 24,
    display: 'flex',
    justifyContent: 'end',
  },
}));

const ResetPassword: React.FC = () => {
  const { styles } = useStyles();
  const { message } = App.useApp();
  const [waiting, setWaiting] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (waiting > 0) {
      interval = setInterval(() => {
        setWaiting((prevWaiting) => {
          if (prevWaiting > 0) {
            return prevWaiting - 1;
          }
          return 0;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [waiting]);

  return (
    <LoginForm
      logo="/logo.svg"
      title="Kratos Admin"
      subTitle="重置密码"
      submitter={{
        render: (props, dom) => {
          return (
            <Button type="primary" size="large" block onClick={() => props.submit()} disabled={waiting > 0}>
              {waiting > 0 ? `${waiting}秒后重试` : '验证'}
            </Button>
          );
        },
      }}
      onFinish={async (values) => {
        console.log('提交重置密码信息', values);
        try {
          const res = await passportSendResetPassword({
            email: values.email,
          });

          localStorage.setItem(`${values.email}-reset_at`, new Date().toISOString());
          setWaiting(60);
          message.success('验证码已发送到您的邮箱，请注意查收');

          console.log('重置密码验证码发送结果', res);
          return true;
        } catch (err: any) {
          console.error('发送验证码失败', err);
          let errorMessage = '发送验证码失败，请稍后重试';
          if (err?.response?.data?.message) {
            // 服务器返回的错误信息
            errorMessage = err.response.data.message;
          } else if (err?.data?.message) {
            // 直接返回的错误信息
            errorMessage = err.data.message;
          } else if (err?.message) {
            // 其他错误信息
            errorMessage = err.message;
          }
          message.error(errorMessage, 3);
          return false;
        }
      }}
    >
      <ProFormText
        name="email"
        placeholder="请输入邮箱地址"
        rules={[
          { required: true, message: '请输入邮箱地址' },
          { type: 'email', message: '请输入有效的邮箱地址' },
        ]}
        fieldProps={{
          size: 'large',
        }}
      />
      <div className={styles.actions}>
        <a onClick={() => history.push('/passport/login')}>返回登录</a>
      </div>
    </LoginForm>
  );
};

export default ResetPassword;
