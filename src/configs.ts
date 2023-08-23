import { ConfigFactory, registerAs } from '@nestjs/config';
import vine from '@vinejs/vine';
import { readdirSync } from 'fs';
import { join } from 'path';
import { AppConfigSchema } from './config/app';

const ConfigSchema = vine.object({
  ...AppConfigSchema.getProperties(),
});

export const validateConfig = async (config: Record<string, unknown>) => {
  const output = await vine.validate({
    schema: ConfigSchema,
    data: config,
  });

  return output;
};

export const getConfig = (configPath: string) => {
  const configFiles = readdirSync(configPath);
  const configs: ConfigFactory[] = [];

  for (const file of configFiles) {
    const fileName = file.replace(/\.[^/.]+$/, '');

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const config = require(join(configPath, file));

    configs.push(registerAs(fileName, config.default || config));
  }

  return configs;
};

export type ConfigType = Awaited<ReturnType<typeof validateConfig>>;
