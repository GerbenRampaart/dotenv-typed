# dotenv-typed
Hi! This library is a very small wrapper around dotenv that controls the way your environment variables are typed.

Imagine your runtime needs these settings:

```ini
PORT=8080
VERBOSE_LOGGING=true
SOME_TOKEN=123456qwerty
ADMIN_EMAIL=test@test.com
```

These settings may, when running the app, come from a .env file or be injected as process envs.

So you create something like an environment.ts which looks like:

```typescript
export const environment {
    port: process.env["PORT"],
    verboseLogging: process.env["VERBOSE_LOGGING"],
    someToken: process.env["SOME_TOKEN"],
    adminEmail: process.env["ADMIN_EMAIL"]
}
```

And when you want a typed version of these settings, you want to add some typing and checking. This is to prevent the wrong settings being injected for example.

```typescript
export interface Environment {
    port: number,
    verboseLogging: boolean,
    someToken: string,
    adminEmail: string
}
```

Ok, a bit better, but now what when you want to use a healthy default, like 8080 for PORT is it's not available. Or what when PORT is available but it does not contain a number? That's where dotenv-typed comes in.

# But now with dotenv-typed !!
With dotenv-typed you just have a typescript file (I tend to call it environment.ts) that types the settings you expect at runtime. These settings can come from a .env or just from process.env.

```typescript
import { init } from "dotenv-typed";

const s = init(/* DotenvConfigOptions here if you want */);

export const environment = {

  // If PORT is not defined in .env or process.env or is not a number, this value will default to 8080 
  port: s.get("PORT").asNumber(8080),

  // If VERBOSE_LOGGING is not defined in .env or process.env or is not a boolean, this value will default to false
  verboseLogging: s.get("VERBOSE_LOGGING").asBool(false),

  // If SOME_TOKEN is not defined in .env or process.env, an exception is thrown
  someToken: s.get("SOME_TOKEN").asString(),

  // If ADMIN_EMAIL is either not available OR does not match the regular expression, an exception is thrown
  adminEmail: s.get("ADMIN_EMAIL").regex(/^[^@\s]+@[^@\s\.]+\.[^@\.\s]+$/).asString()
}
```

Now, your app can use, for example, environment.port anywhere without worrying about it's value.

As you can see from the example, you can provide an optional default as an argument in the asString, asBool and asNumber.

## Requirements
nodejs 8 or higher

## Initial setup
The plumbing of this npm package was created using the guide created by Carl-Johan Kihl:
- https://itnext.io/step-by-step-building-and-publishing-an-npm-typescript-package-44fe7164964c

However, ts-lint is getting obsolete, so we're using eslint:
- https://khalilstemmler.com/blogs/typescript/eslint-for-typescript/