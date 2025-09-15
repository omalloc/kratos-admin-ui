// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/console/portal/post */
export async function postCreatePost(body: API.CreatePostRequest, options?: { [key: string]: any }) {
  return request<API.CreatePostReply>('/api/console/portal/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/console/portal/post/${param0} */
export async function postGetPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PostGetPostParams,
  options?: { [key: string]: any },
) {
  const { post_id: param0, ...queryParams } = params;
  return request<API.GetPostReply>(`/api/console/portal/post/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/console/portal/post/${param0} */
export async function postUpdatePost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PostUpdatePostParams,
  body: API.UpdatePostRequest,
  options?: { [key: string]: any },
) {
  const { post_id: param0, ...queryParams } = params;
  return request<API.UpdatePostReply>(`/api/console/portal/post/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/console/portal/post/${param0} */
export async function postDeletePost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PostDeletePostParams,
  options?: { [key: string]: any },
) {
  const { post_id: param0, ...queryParams } = params;
  return request<API.DeletePostReply>(`/api/console/portal/post/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/console/portal/posts */
export async function postListPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PostListPostParams,
  options?: { [key: string]: any },
) {
  return request<API.ListPostReply>('/api/console/portal/posts', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
