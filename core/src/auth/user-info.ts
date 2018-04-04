/**
 * Info that is attached to the jwt token and decoded into the payload */
export interface UserInfo {
    mail: string;
    userLevel: number;
    expiresAt: Date;
}
