import * as dotenv from 'dotenv';

dotenv.config();

export const jwtSecret = process.env.JWT_SESSION_SECRET;
export const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;