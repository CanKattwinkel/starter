/**
 * Info that is attached to the jwt token and decoded into the payload. Also submitted to the client
 * and there stored in localstorage */

export interface UserInfo {
    mail: string;
    userLevel: number;
    expiresAt: Date;
    xsrfToken: string;
    sessionId: number;
}

// This is returned to the client
// the client has never access to the jwt token since the cookie is httpOnly..
export interface LoginInfo {
    tokenResponse: UserInfo;
    refreshToken: string;
}
