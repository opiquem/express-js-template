import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3001,
  clientUrl: process.env.CLIENT_URL,
  db: {
    database: process.env.MYSQL_DATABASE,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    host: process.env.MYSQL_HOST,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES || 30,
    refreshExpirationDays: process.env.JWT_REFRESH_EXPIRATION_DAYS || 30,
    resetPasswordExpirationMinutes:
      process.env.JWT_RESET_PASSWORD_EXPIRATION_MINUTES || 10,
    verifyEmailExpirationMinutes:
      process.env.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES || 10,
    inviteEmailExpirationMinutes:
      process.env.JWT_INVITE_EMAIL_EXPIRATION_MINUTES || 10,
  },
};
