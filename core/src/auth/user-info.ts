/**
 * Info that is attached to the jwt token and decoded into the payload. Also submitted to the client
 * and there stored in localstorage */
export interface UserInfo {
    mail: string;
    userLevel: number;
    expiresAt: Date;
    xsrfToken: string;
}
