import { init } from "../../init";
import { join } from "path";
import { config } from "dotenv";

describe("init tests", () => {
    test("Testing settings process.env variables", () => {
        const envPath = join(__dirname, ".env");
        const s = init({
            path: envPath
        });

        // number of process env settings loaded by init() must be equal to the process.env settings
        // MINUS the dotenv loaded settings
        const processEnv = Object.keys(process.env);
        expect(s.processEnvSettings.length).toBe(processEnv.length - s.dotEnvSettings.length);
    });

    test("Testing settings dotenv variables", () => {
        const envPath = join(__dirname, ".env");
        const s = init({
            path: envPath
        });

        const cfg = config({
            path: envPath
        });

        expect(cfg.parsed).toBeDefined();

        if (!cfg.parsed) {
            throw new Error("parsed was null");
        }

        // number of dotenv settings loaded by init() must be equal to the dotenv settings loaded by the dotenv package
        const dotEnv = Object.keys(cfg.parsed);
        expect(s.dotEnvSettings.length).toBe(dotEnv.length);
    });
})
