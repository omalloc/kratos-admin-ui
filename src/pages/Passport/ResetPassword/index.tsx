import { passportSendResetPassword } from '@/services/console/passport';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button } from 'antd';
import { createStyles } from 'antd-style';
import { useState } from 'react';

const useStyles = createStyles(({ token }) => ({
  actions: {
    marginBlockEnd: 24,
    display: 'flex',
    justifyContent: 'end',
  },
}));

const ResetPassword: React.FC = () => {
  const { styles } = useStyles();
  const [waiting, setWaiting] = useState<number>(0);

  setInterval(() => {
    if (waiting > 0) {
      setWaiting(waiting - 1);
    }
  }, 1000);

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
        const res = await passportSendResetPassword({
          email: values.email,
        });

        localStorage.setItem(`${values.email}-reset_at`, new Date().toISOString());
        setWaiting(60);

        console.log('重置密码验证码发送结果', res);
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
