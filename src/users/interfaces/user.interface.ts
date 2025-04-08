export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    level: number;
    profile_img: string;
    createdAt?: Date;  
    deletedAt?: Date;  
  }