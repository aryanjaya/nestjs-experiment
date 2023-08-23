import vine from '@vinejs/vine';

export const AppConfigSchema = vine.object({
  app: vine.object({
    name: vine.string(),
    env: vine.enum(['production', 'development', 'test', 'local']),
    debug: vine.enum(['true', 'false']),
    url: vine.string(),
    port: vine.number(),
  }),
});

export default () => ({
  name: process.env.APP_NAME || 'NestJS',
  env: process.env.APP_ENV || 'production',
  debug: process.env.APP_DEBUG || 'false',
  url: process.env.APP_URL || 'http://localhost',
  port: Number(process.env.PORT || 3000),
});
