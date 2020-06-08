import { Setting } from "./setting";

export class Settings {
  constructor(public settings: Setting[]) {
  }

  get(name: string, ignoreCase = true): Setting {
    const targetName = ignoreCase ? name.toLowerCase() : name;
    const s = this.settings.find((setting: Setting) => {
      const settingName = ignoreCase ? setting.nameLower : setting.name;
      return settingName === targetName;
    });

    if (s) {
      return s;
    }

    return new Setting(name, undefined, false);
  }

  get processEnvSettings(): Setting[] {
    return this.settings.filter((s: Setting) => !s.fromDotenv);
  }

  
  get dotEnvSettings(): Setting[] {
    return this.settings.filter((s: Setting) => s.fromDotenv);
  }
}
