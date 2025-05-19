import { Helmet, Outlet, useRouteProps } from '@umijs/max';
import { Col, Row, theme } from 'antd';

const PassportLayout: React.FC = () => {
  const { token } = theme.useToken();
  const { name } = useRouteProps();

  return (
    <div
      style={{
        backgroundColor: token.colorBgContainer,
        height: '100vh',
      }}
    >
      <Helmet>
        <title>{name}</title>
      </Helmet>
      <Row style={{ height: '100%' }}>
        <Col sm={24} md={10} style={{ paddingTop: '80px' }}>
          <Outlet />
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
              alt="Banner"
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

export default PassportLayout;
