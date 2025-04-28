export const mergeData = (
  params: {
    pageSize?: number;
    current?: number;
    keyword?: string;
  } & Record<string, any>,
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { current, pageSize, keyword: _, ...rest } = params;
  return {
    'pagination.current': current,
    'pagination.page_size': pageSize,
    ...rest,
  };
};
