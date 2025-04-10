import { SetMetadata } from '@nestjs/common';

export const REQUIRED_LEVEL_KEY = 'requiredLevel';

// Níveis: 1, 2, 3, 4, 5...
export const RequiredLevel = (level: number) => SetMetadata(REQUIRED_LEVEL_KEY, level);