/* eslint-disable no-unused-vars */
import request from '@/utils/request';

enum Api {
  USER_Login = '/api/login',
  USER_Register = '/api/register',
  USER_OTP = '/api/otp',
  USER_INFP = '/api/user',
}

interface ResProps {
  code: 0 | -1;
  data: any;
}

export const login = (data: { username: string; password: string }): Promise<ResProps> =>
  request({ url: Api.USER_Login, method: 'POST', data });

// export const doSignUp = createAsyncThunk('auth/doSignUp', async (signUpPayload: SignUpRequest) =>
//   signUp(signUpPayload),
// );


export const register = (data: { username: string; password: string; phoneNumber: string; address: string; }): Promise<ResProps> =>
  request({ url: Api.USER_Register, method: 'POST', data });

export const otp = (data: { code: string; }): Promise<ResProps> =>
request({ url: Api.USER_OTP, method: 'POST', data });

export const getUserInfo = () => request({ url: Api.USER_INFP, method: 'GET' });
