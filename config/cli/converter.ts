#!/usr/bin/env node

const YAML = require('js-yaml');
const { join } = require('path');
const fs = require('fs');

const basePath = join(__dirname, '../');
let filePath = join(basePath, 'openapi.yaml');
let jsonPath = join(basePath, 'converter.openapi.json');

const logPrefix = '[OpenAPIConverter]:';

const log = (...args: any[]) => {
  const [param0, ...rest] = args;
  if (param0) {
    console.error(logPrefix, ...rest);
    return;
  }
  console.log(logPrefix, ...rest);
};

fs.exists(filePath, (exists: boolean) => {
  if (!exists) {
    log(false, `🚥 加载 ${filePath} 失败，文件不存在 尝试查找上一级`);
    filePath = join(basePath, '..', 'openapi.yaml');
  }
});

fs.readFile(filePath, 'utf8', (err: Error, raw: any) => {
  if (err) {
    throw new Error(err.message);
  }

  const content = YAML.load(raw);
  if (content === null || content === undefined || content === '') {
    log(true, '🚥 加载 openapi.yaml 失败，文件内容为空');
    return;
  }

  const prettyJsonContent = JSON.stringify(content, null, 2);

  log(false, '💺 将 OpenAPI YAML 转换为 JSON');
  log(false, '💺 加载到 API 版本号为 ', content.openapi);

  fs.writeFileSync(jsonPath, prettyJsonContent, 'utf8');
  log(false, '✅ 写入文件成功');
  fs.rmSync(filePath);
  log(false, '✅ 删除原始文件成功');
  log(false, '✅ 转换完成');
});
