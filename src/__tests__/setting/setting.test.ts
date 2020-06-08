import { init } from "../../init";
import { join } from "path";

describe("setting tests", () => {
    test("Testing retrieving settings with a wrong case", () => {
        const envPath = join(__dirname, ".env");
        const s = init({
            path: envPath
        });

        // Note that the actual setting in the .env in this directory is different
        // "SETTING_WITH_WRONG_CASe". Note the last lowercase 'e'.
        const result = s.get("SETTING_WITH_WRONG_CASE").asString();

        // It should still match because case insensitive is true by default.
        expect(result).toEqual("test1");
    });

    test("Testing retrieving settings with the exact case", () => {
      const envPath = join(__dirname, ".env");
      const s = init({
          path: envPath
      });

      // Actual setting is "SETTING_WITH_CORRECT_CASE". All caps.
      // This should throw an exception
      expect(() => s.get("SETTING_WITH_CORRECT_case", false).asString()).toThrow();
  });
});