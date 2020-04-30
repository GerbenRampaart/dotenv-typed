import { Setting } from "./setting";

export class Settings {
  constructor(public settings: Setting[]) {
  }

  get(name: string): Setting {
    const s = this.settings.find((s: Setting) => s.name === name);

    if (s) {
      return s;
    }

    return new Setting(name, undefined);
  }

  get isProduction(): boolean {
    const ne = this.get("NODE_ENV");
    return ne.asString("development") === "production";
  }

  get port(): number {
    const p = this.get("PORT");
    return p.asNumber(8080);
  }
}
