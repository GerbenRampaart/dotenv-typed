import { config, DotenvConfigOptions } from "dotenv";
import { Setting } from "./setting";
import { Settings } from "./settings";

export const init = (options?: DotenvConfigOptions | undefined): Settings => {
  const settings: Setting[] = [];
  const dotenvParsedSettings = config(options);
  const parsed = dotenvParsedSettings.parsed;

  const dotenvSettings: { name: string, value: string }[] = [];

  if (parsed) {
    for (const key in parsed) {
      if (parsed.hasOwnProperty(key)) {
        dotenvSettings.push({
          name: key,
          value: parsed[key]
        })
      }
    }
  }

  for (const key in process.env) {
    if (process.env.hasOwnProperty(key)) {
      const val = process.env[key];
      const isDotenvSetting = !!dotenvSettings.find((v) => v.name === key);

      settings.push(new Setting(key, val, isDotenvSetting));
    }
  }

  return new Settings(settings);
};
