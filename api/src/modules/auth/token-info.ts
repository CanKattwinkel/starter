import {UserInfo} from '@core/auth/user-info';

// never send this to client
// client should not have access to jwt token
export interface ServerOnlyTokenInfo {
  tokenResponse: UserInfo;
  access_token: string;
}
