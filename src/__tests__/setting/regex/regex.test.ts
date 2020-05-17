import { Settings } from "../../../settings";
import { join } from "path";
import { init } from "../../../init";

describe("regex tests", () => {

  const envPath = join(__dirname, ".env.regex");
  const s: Settings = init({
    path: envPath
  });

  test("Should success with only numbers", () => {
    const val = s.get("ONLY_NUMBERS").regex(/^[0-9]*$/).asNumber();
    expect(val).toBe(1234567890);
  });

  test("Should fail with only numbers", () => {
    const on = s.get("ONLY_NUMBERS");

    // Try a regex that matches only letters in a string
    expect(() => on.regex(/^[a-zA-Z]+$/).asNumber()).toThrow();
  });

  // https://stackoverflow.com/questions/742451/what-is-the-simplest-regular-expression-to-validate-emails-to-not-accept-them-bl
  // eslint-disable-next-line no-useless-escape
  const emailRegex = /^[^@\s]+@[^@\s\.]+\.[^@\.\s]+$/;

  test("Should success with email regex", () => {
    const val = s.get("EMAIL").regex(emailRegex).asString();
    expect(val).toBe("test@test.com");
  });

  test("Should fail with email regex", () => {
    const on = s.get("NOT_EMAIL");
    expect(() => on.regex(emailRegex).toString()).toThrow();
  });
});