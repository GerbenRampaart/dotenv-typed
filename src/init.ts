import { config } from "dotenv";
import { Setting } from "./setting";
import { Settings } from "./settings";
import { resolve } from "path";

export const init = (path: string = resolve(process.cwd(), '.env')): Settings => {
  console.info(`Settings path: ${path}`);
  const dotEnv = config({
    encoding: "utf-8",
    path: path,
    debug: true
  });

  if (dotEnv.error) {
    throw dotEnv.error;
  }

  if (!dotEnv.parsed) {
    throw new Error("No settings could be parsed");
  }

  console.info(`App started with these settings:`);

  const keys = Object.keys(dotEnv.parsed);
  const settings: Setting[] = [];

  keys.forEach((k: string) => {
    let v = dotEnv.parsed[k];
    v = v.replace(/(\r\n|\n|\r)/gm, "");

    console.info(`${k}: ${v}`);
    settings.push(new Setting(k, v));
  });

  return new Settings(settings);
};
