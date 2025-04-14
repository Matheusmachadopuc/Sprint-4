
export interface IUserPayload {
    sub: string;      
    email: string;
    level: number;
    iat?: number;     
    exp?: number;    
  }