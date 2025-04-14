
export interface JwtPayload {
  sub: string;
  email: string;
  level: number;
  iat?: number;
  exp?: number;
  jti?: string;
}