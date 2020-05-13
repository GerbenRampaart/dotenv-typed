export class Setting {
  constructor(public name: string, public rawValue: string | undefined, public fromDotenv: boolean) {}

  asNumber(def?: number): number {
    const v = this.rawValue;
    const i = parseInt(v || "", 10);

    if (!isNaN(i)) {
      return i;
    }
    
    return this.defaultOrThrow(def, "Must be number.");
  }

  asBool(def?: boolean): boolean {
    let v = this.rawValue;

    // We can't rely on truthy and falsy here
    v = (v || "").trim().toLowerCase();

    if (v === "true" || v === "false") {
      return v === "true" ? true : false;
    }
    
    return this.defaultOrThrow(def, "Must be boolean.");
  }

  asString(def?: string): string {
    const v = this.rawValue;

    if (v) {
      return v;
    }

    return this.defaultOrThrow(def, "Must be string.");
  }

  regex(pattern: string): Setting {

    if (this.rawValue === undefined) {
      this.throw(`pattern ${pattern} did not match value`);
    }

    const expression = new RegExp(pattern);
    const test = expression.test(this.asString());

    if (!test) {
      this.throw(`pattern ${pattern} did not match value`);
    }

    return this;
  }

  private defaultOrThrow = (def: any | undefined, msg: string) => {
    if (def !== undefined) {
      return def;
    }

    this.throw(msg);
  };

  private throw = (msg: string) => {
    throw new Error(`process.env['${this.name}'] was '${this.rawValue}'. ${msg}`);
  }
}
