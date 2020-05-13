# dotenv-typed
Hi! This library is a very small wrapper around dotenv that loads and controls the way your environment variables are loaded.

Imagine your runtime needs these setting:

```ini
PORT=8080
VERBOSE_LOGGING=true
SOME_TOKEN=123456qwerty
```

These settings may, when running the app, come from a .env file or be injected as process envs.

So you create something like an environment.ts which looks like:

```typescript
export const environment {
    port: process.env["PORT"],
    verboseLogging: process.env["VERBOSE_LOGGING"],
    someToken: process.env["SOME_TOKEN"]
}
```

And when you want a typed version of these settings, you want to add some typing and checking. Can't trust these engineers injecting the variables right ;-)

```typescript
export interface Environment {
    port: number,
    verboseLogging: boolean,
    someToken: string
}
```

Ok, a bit better, but now what when you want to use a healthy default, like 8080 for PORT is it's not available. Or what when PORT is available but it does not contain a number? That's where dotenv-typed comes in.

# But now with dotenv-typed !!

## Requirements
nodejs 8 or higher

## Initial setup
The plumbing of this npm package was created using the guide created by Carl-Johan Kihl:
- https://itnext.io/step-by-step-building-and-publishing-an-npm-typescript-package-44fe7164964c

However, ts-lint is getting obsolete, so we're using eslint:
- https://khalilstemmler.com/blogs/typescript/eslint-for-typescript/