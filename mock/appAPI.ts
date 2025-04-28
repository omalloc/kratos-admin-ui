const apps = [
  {
    key: 100010,
    name: '应用1',
    description: '应用1描述',
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
    dataCenter: ['dc1', 'dc2'],
  },
  {
    key: 100011,
    name: '应用2',
    description: '应用2描述',
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
    dataCenter: ['dc1', 'dc2'],
  },
];

export default {
  'GET /api/v1/apps': (req: any, res: any) => {
    res.json({
      success: true,
      data: { apps },
      errorCode: 0,
    });
  },
};
