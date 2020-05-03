export class Setting {
  constructor(public name: string, public rawValue: string | undefined) {}

  asNumber(def: number | undefined = undefined): number {
    const v = this.rawValue;
    const i = parseInt(v || "");

    if (!isNaN(i)) {
      return i;
    }
    
    return this.defaultOrThrow(def, "Must be number.");
  }

  asBool(def: boolean | undefined = undefined): boolean {
    let v = this.rawValue;

    // We can't rely on truthy and falsy here
    v = (v || "").trim().toLowerCase();

    if (v === "true" || v === "false") {
      return v === "true" ? true : false;
    }
    
    return this.defaultOrThrow(def, "Must be boolean.");
  }

  asString(def: string | undefined = undefined): string {
    let v = this.rawValue;

    if (v) {
      return v;
    }

    return this.defaultOrThrow(def, "Must be string.");
  }

  regex()

  private defaultOrThrow = (def: any | undefined, msg: string) => {
    if (def !== undefined) {
      return def;
    }
    throw new Error(`process.env['${this.name}'] was '${this.rawValue}'. ${msg}`);
  };
}
