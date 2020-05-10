import { config, DotenvConfigOptions } from "dotenv";
import { Setting } from "./setting";
import { Settings } from "./settings";

export const init = (options?: DotenvConfigOptions | undefined): Settings => {
  const settings: Setting[] = [];
  const dotenvSettings = config(options);

  for (const key in process.env) {
    if (process.env.hasOwnProperty(key)) {
      const val = process.env[key];

      let isDotenvSetting = false;

      if (dotenvSettings.parsed) {
        const des
      }

      settings.push(new Setting(key, val));
    }
  }

  return new Settings(settings);
};
