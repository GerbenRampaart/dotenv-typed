import { init } from "../../../index";
import { join } from "path";
import { Settings } from "../../../settings";

describe("asString tests", () => {

  const envPath = join(__dirname, ".env.asString");
  const s: Settings = init({
    path: envPath
  });

  test("Should be my value", () => {
    const val = s.get("MY_STRING").asString();
    expect(val).toBe("something something darkside");
  });

  test("Should be default because empty", () => {
    const def = "my default string";
    const val = s.get("MY_STRING_NOT_EXISTING").asString(def);
    expect(val).toBe(def);
  });

  test("Should throw error", () => {
    expect(() => {
      s.get("MY_STRING_NOT_EXISTING").asString();
    }).toThrow();
  });
});