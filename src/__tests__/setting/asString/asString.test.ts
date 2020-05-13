import { init } from "../../../init";
import { join } from "path";
import { Settings } from "../../../settings";

describe("asNumber tests", () => {

  const envPath = join(__dirname, ".env.asNumber");
  const s: Settings = init({
    path: envPath
  });

  test("Should be my number", () => {
    const val = s.get("MY_NUMBER").asNumber();
    expect(val).toBe(12345);
  });

  test("Should be my number as default because empty", () => {
    const val = s.get("MY_NUMBER_NOT_EXISTING").asNumber(24680);
    expect(val).toBe(24680);
  });

  test.only("Should be my number as default because weird", () => {
    const val = s.get("MY_NUMBER_WEIRD").asNumber(24680);
    expect(val).toBe(24680);
  });
});