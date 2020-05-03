import { init } from "../../init";
import { join } from "path";

describe("init tests", () => {
    test("Testing init WITH .env available", () => {
        const envPath = join(__dirname, ".env");
        const s = init({
            path: envPath
        });
        expect(s.settings.length).toBeGreaterThan(0);
    });

    test("Testing init WITH .env available", () => {
        const envPath = join(__dirname, ".env.doesnotexist");
        const s = init({
            path: envPath
        });
        expect(s.settings.length).toBeGreaterThan(0);
    });
})
