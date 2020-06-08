import { init, config as c } from "../../index";
import { join } from "path";
import { config } from "dotenv";

describe("init tests", () => {
    test("Testing init WITH .env available", () => {
        const envPath = join(__dirname, ".env");
        const s = init({
            path: envPath
        });

        expect(s.dotEnvSettings.length).toBe(3);
    });

    // 'config' now also works. one test is enough to verify.
    test("Testing config WITH .env available", () => {
        const envPath = join(__dirname, ".env");
        const s = c({
            path: envPath
        });

        expect(s.dotEnvSettings.length).toBe(3);
    });


    test("Testing init WITHOUT .env available", () => {
        const envPath = join(__dirname, ".env.doesnotexist");
        const s = init({
            path: envPath
        });

        // number of dotenv settings loaded must be equal to 0
        expect(s.dotEnvSettings.length).toBe(0);

        // number of process env settings loaded by init() must be equal to the process.env settings
        const processEnv = Object.keys(process.env);
        expect(s.processEnvSettings.length).toBe(processEnv.length);
    });

    test("Testing init process.env variables", () => {
        const envPath = join(__dirname, ".env");
        const s = init({
            path: envPath
        });

        // number of process env settings loaded by init() must be equal to the process.env settings
        // MINUS the dotenv loaded settings
        const processEnv = Object.keys(process.env);
        expect(s.processEnvSettings.length).toBe(processEnv.length - s.dotEnvSettings.length);
    });

    test("Testing init dotenv variables", () => {
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
