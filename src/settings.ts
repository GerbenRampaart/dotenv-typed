import { Setting } from "./setting";

export class Settings {
  constructor(public settings: Setting[]) {
  }

  get(name: string): Setting {
    const s = this.settings.find((setting: Setting) => setting.name === name);

    if (s) {
      return s;
    }

    return new Setting(name, undefined);
  }
}
