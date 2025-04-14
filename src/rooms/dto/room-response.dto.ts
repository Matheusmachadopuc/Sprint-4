import { Expose } from 'class-transformer';


export class RoomResponseDto {
  @Expose()
  id: string;

  @Expose()
  description: string;

  @Expose()
  accessLevel: number;

  @Expose()
  is_blocked: boolean;

  @Expose({ name: 'createdAt' })
  created_at: Date;

  @Expose({ name: 'updatedAt' })
  updated_at: Date;

  
  constructor(partial: Partial<RoomResponseDto>) {
    Object.assign(this, partial);
  }
}