import { config, DotenvConfigOptions } from "dotenv";
import { Setting } from "./setting";
import { Settings } from "./settings";

export const init = (options?: DotenvConfigOptions): Settings => {
  const settings: Setting[] = [];
  const dotenvParsedSettings = config(options);
  const dotenvKeys: string[] = Object.keys(dotenvParsedSettings.parsed || []);

  for (const key in process.env) {
    const val = process.env[key];
    const isDotenvSetting = !!dotenvKeys.find((dotEnvKey: string) => dotEnvKey === key);
    settings.push(new Setting(key, val, isDotenvSetting));
  }

  return new Settings(settings);
};
