import { join } from 'path';

const openAPI = [
  {
    requestLibPath: "import { request } from '@umijs/max'",
    schemaPath: join(__dirname, 'converter.openapi.json'),
    mock: false,
    projectName: 'console',
  },
];

export default openAPI;
