/* eslint-disable no-unused-vars */
import request from '@/utils/request';

enum Api {
  USER_Login = 'https://dev-apiv4.pasgo.com.vn/api/v1/Account/login',
  USER_Register = 'https://dev-apiv4.pasgo.com.vn/api/v1/Account/register',
  USER_OTP = 'https://dev-apiv4.pasgo.com.vn/api/v1/Account/send-otp',
  USER_INFP = '/api/user',
}

interface ResProps {
  code: 200 | -1;
  data: any;
}

export const login = (data: { username: string; password: string }): Promise<ResProps> =>
  request({ url: Api.USER_Login, method: 'POST', data });

// export const doSignUp = createAsyncThunk('auth/doSignUp', async (signUpPayload: SignUpRequest) =>
//   signUp(signUpPayload),
// );

export const register = (data: {
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  fullname: string;
  accountType: string;
}): Promise<ResProps> => request({ url: Api.USER_Register, method: 'POST', data });

export const otp = (data: {
  code: string;
  authenId: string;
  typeId: 1;
}): Promise<ResProps> => request({ url: Api.USER_OTP, method: 'POST', data });

export const getUserInfo = () => request({ url: Api.USER_INFP, method: 'GET' });
