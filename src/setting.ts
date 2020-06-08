export class Setting {
  constructor(public name: string, public rawValue: string | undefined, public fromDotenv: boolean) {
  }

  get nameLower(): string {
    return this.name.toLowerCase();
  }

  asNumber(def?: number): number {
    const v = this.rawValue;
    const i = parseInt(v || "", 10);

    if (!isNaN(i)) {
      return i;
    }

    if (!def) {
      throw new Error(`${this.toString()}. Must be number`);
    }

    return def;
  }

  asBool(def?: boolean): boolean {
    let v = this.rawValue;

    // We can't rely on truthy and falsy here
    v = (v || "").trim().toLowerCase();

    if (v === "true" || v === "false") {
      return v === "true" ? true : false;
    }

    if (!def) {
      throw new Error(`${this.toString()}. Must be boolean`);
    }

    return def;
  }

  asString(def?: string): string {
    const v = this.rawValue;

    if (v) {
      return v;
    }

    if (!def) {
      throw new Error(`${this.toString()}. Must be string`);
    }

    return def;
  }

  regex(pattern: RegExp): Setting {
    const errString = `${this.toString()}. Pattern ${pattern} did not match value`;

    if (this.rawValue === undefined) {
      throw new Error(errString);
    }

    const test = pattern.test(this.asString());

    if (!test) {
      throw new Error(errString);
    }

    return this;
  }

  toString = (): string => {
    return `${this.name} => ${this.rawValue}`;
  }
}






