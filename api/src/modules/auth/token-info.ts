import {UserInfo} from '@core/auth/user-info';
import {SessionEntity} from '../session/session.entity';

// never send this to client
// client should not have access to jwt token (httpOnly cookie)
export interface ServerOnlyTokenInfo {
  tokenResponse: UserInfo;
  access_token: string;
  session: SessionEntity;
}



