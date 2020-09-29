import { init } from "../../../index";
import { join } from "path";
import { Settings } from "../../../settings";

describe("asBool tests", () => {

  const envPath = join(__dirname, ".env.asBool");
  const s: Settings = init({
    path: envPath
  });

  test("Should be true", () => {
    const val = s.get("MY_BOOL_TRUE").asBool();
    expect(val).toBe(true);
  });

  test("Should be false", () => {
    const val = s.get("MY_BOOL_FALSE").asBool();
    expect(val).toBe(false);
  });

  test("Should be default because empty", () => {
    const val = s.get("MY_BOOL_NOT_EXISTING").asBool(true);
    expect(val).toBe(true);
  });

  test("Should be true as default because weird", () => {
    const val = s.get("MY_BOOL_WEIRD").asBool(true);
    expect(val).toBe(true);
  });

  test("Should be true as default because weird", () => {
    const val = s.get("MY_BOOL_WEIRD").asBool(false);
    expect(val).toBe(false);
  });
});