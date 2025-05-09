// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取当前用户信息 GET /api/console/passport/current */
export async function passportCurrentUser(options?: { [key: string]: any }) {
  return request<API.CurrentUserReply>('/api/console/passport/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 登录 POST /api/console/passport/login */
export async function passportLogin(
  body: API.LoginRequest,
  options?: { [key: string]: any },
) {
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
export async function passportLogout(
  body: API.LogoutRequest,
  options?: { [key: string]: any },
) {
  return request<API.LogoutReply>('/api/console/passport/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 注册 POST /api/console/passport/register */
export async function passportRegister(
  body: API.RegisterRequest,
  options?: { [key: string]: any },
) {
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
export async function passportResetPassword(
  body: API.ResetPasswordRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResetPasswordReply>(
    '/api/console/passport/reset_password',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 发送验证码 POST /api/console/passport/send_captcha */
export async function passportSendCaptcha(
  body: API.SendCaptchaRequest,
  options?: { [key: string]: any },
) {
  return request<API.SendCaptchaReply>('/api/console/passport/send_captcha', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
