export class Setting {
  constructor(public name: string, public rawValue: string | undefined) {}

  asNumber(def: number | undefined): number {
    const v = this.rawValue;
    const i = parseInt(v || "", 10);

    if (!isNaN(i)) {
      return i;
    }
    
    return this.defaultOrThrow(def, "Must be number.");
  }

  asBool(def: boolean | undefined): boolean {
    let v = this.rawValue;

    // We can't rely on truthy and falsy here
    v = (v || "").trim().toLowerCase();

    if (v === "true" || v === "false") {
      return v === "true" ? true : false;
    }
    
    return this.defaultOrThrow(def, "Must be boolean.");
  }

  asString(def: string | undefined): string {
    const v = this.rawValue;

    if (v) {
      return v;
    }

    return this.defaultOrThrow(def, "Must be string.");
  }

  regex(): Setting {

    return this;
  }

  private defaultOrThrow = (def: any | undefined, msg: string) => {
    if (def !== undefined) {
      return def;
    }
    throw new Error(`process.env['${this.name}'] was '${this.rawValue}'. ${msg}`);
  };
}
