export interface IAccessTokenPayload {
  userId: string;
  email: string;
  name: string;
  role: string;
  photo?: string;
}

export interface IstoreRefreshTokenPayload {
  userId: string;
  refreshToken: string;
  userAgent?: string;
  ipAddress?: string;
}

export interface IverifyRefreshTokenPayload {
  userId: string;
  refreshToken: string;
}

export interface IremoveRefreshTokenPayload {
  userId: string;
  refreshToken: string;
}
