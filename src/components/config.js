import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  APP_DOMAIN: process.env.APP_DOMAIN,
  APP_PROTOCOL: process.env.APP_PROTOCOL,
  COMMUNITY_NAME: process.env.COMMUNITY_NAME,
};
