import { InitialState } from '@/typing';
import { PageContainer, ProCard, StatisticCard } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Col, Row } from 'antd';

const HomePage: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState as InitialState;
  console.log('currentUser', currentUser?.user);
  return (
    <PageContainer title={false} ghost>
      <Row gutter={[24, 24]}>
        <Col span={16}>
          <ProCard style={{ backgroundColor: 'rgba(39, 166, 254, 0.5)' }}>
            <h1>
              欢迎回来 <span style={{ color: '#1890ff' }}>{currentUser?.user.nickname}</span>
              <span className="welcome-text">，祝你开心每一天！</span>
            </h1>
            <p>微服务集群一体化管理平台</p>
          </ProCard>
        </Col>
        <Col span={8}>
          <ProCard>
            <StatisticCard
              statistic={{
                title: '可用资源',
                value: 22,
              }}
            />
          </ProCard>
        </Col>
        <Col span={24}>
          <StatisticCard.Group>
            <StatisticCard
              statistic={{
                title: '总服务数',
                value: 22,
              }}
            />
            <StatisticCard.Operation>=</StatisticCard.Operation>
            <StatisticCard statistic={{ title: '在线', value: 20, status: 'processing' }} />
            <StatisticCard.Operation>+</StatisticCard.Operation>
            <StatisticCard statistic={{ title: '不可用', value: 1, status: 'error' }} />
            <StatisticCard.Operation>+</StatisticCard.Operation>
            <StatisticCard statistic={{ title: '不在线', value: 1, status: 'warning' }} />
          </StatisticCard.Group>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default HomePage;
