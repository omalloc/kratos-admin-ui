// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 更新用户名 POST /api/console/passport/${param0}/username */
export async function passportUpdateUsername(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PassportUpdateUsernameParams,
  body: API.UpdateUsernameRequest,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.UpdateUsernameReply>(`/api/console/passport/${param0}/username`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 获取授权的菜单 GET /api/console/passport/authorize_menu */
export async function passportAuthorizeMenu(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PassportAuthorizeMenuParams,
  options?: { [key: string]: any },
) {
  return request<API.AuthorizeMenuReply>('/api/console/passport/authorize_menu', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取当前用户信息 GET /api/console/passport/current */
export async function passportCurrentUser(options?: { [key: string]: any }) {
  return request<API.CurrentUserReply>('/api/console/passport/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 登录 POST /api/console/passport/login */
export async function passportLogin(body: API.LoginRequest, options?: { [key: string]: any }) {
  return request<API.LoginReply>('/api/console/passport/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 登出 POST /api/console/passport/logout */
export async function passportLogout(body: API.LogoutRequest, options?: { [key: string]: any }) {
  return request<API.LogoutReply>('/api/console/passport/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新用户信息 POST /api/console/passport/profile */
export async function passportUpdateProfile(body: API.UpdateProfileRequest, options?: { [key: string]: any }) {
  return request<API.UpdateProfileReply>('/api/console/passport/profile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 刷新 token POST /api/console/passport/refresh-token */
export async function passportRefreshToken(body: API.RefreshTokenRequest, options?: { [key: string]: any }) {
  return request<API.RefreshTokenReply>('/api/console/passport/refresh-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 注册 POST /api/console/passport/register */
export async function passportRegister(body: API.RegisterRequest, options?: { [key: string]: any }) {
  return request<API.RegisterReply>('/api/console/passport/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 重置密码 POST /api/console/passport/reset_password */
export async function passportResetPassword(body: API.ResetPasswordRequest, options?: { [key: string]: any }) {
  return request<API.ResetPasswordReply>('/api/console/passport/reset_password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 发送验证码 POST /api/console/passport/send_captcha */
export async function passportSendCaptcha(body: API.SendCaptchaRequest, options?: { [key: string]: any }) {
  return request<API.SendCaptchaReply>('/api/console/passport/send_captcha', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 发送重置密码验证码 POST /api/console/passport/send_reset_password */
export async function passportSendResetPassword(
  body: API.SendResetPasswordCaptchaRequest,
  options?: { [key: string]: any },
) {
  return request<API.SendResetPasswordCaptchaReply>('/api/console/passport/send_reset_password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
