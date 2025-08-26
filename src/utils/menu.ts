import type { MenuDataItem } from '@ant-design/pro-components';

export const listToTree = (menuData: API.MenuInfo[] = []): MenuDataItem[] => {
  // 先构建一个父ID到子节点的映射
  const menuMap = menuData.reduce((acc, node) => {
    const pid = node.pid || '0';
    if (!acc[pid]) acc[pid] = [];
    acc[pid].push(node);
    return acc;
  }, {} as Record<string, API.MenuInfo[]>);

  // 递归构建树
  const collectorsTree = (parentId: string = '0'): MenuDataItem[] => {
    const children = menuMap[parentId] || [];
    return children.map((node) => ({
      path: node.path,
      name: node.name,
      icon: node.icon || 'icon-menu',
      sort_by: node.sort_by,
      children: collectorsTree(node.uid!),
    }));
  };

  const collection = collectorsTree();
  return collection.sort((a, b) => a.sort_by - b.sort_by);
};
