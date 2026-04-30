# Local Setup

This guide prepares ChamadaFacil for local development and review.

## Requirements

- Node.js 20.9.0 or newer.
- npm.
- Supabase CLI.
- Docker Desktop if you want to run the local Supabase stack.

## Install Dependencies

```bash
npm install
```

## Configure Environment

Copy the example file:

```bash
cp .env.example .env.local
```

Fill:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

For local Supabase, run:

```bash
npm run supabase:start
npm run supabase:status
```

Use the API URL, anon key, and service role key shown by `supabase status`.

## Reset Local Database

```bash
npm run supabase:db:reset
```

This applies all migrations and then runs `supabase/seed.sql`.

## Local Demo Login

The seed creates one local-only admin user:

- E-mail: `admin@chamadafacil.com.br`
- Password: `admin123`

Use it only with the local Supabase database. Do not create or publish this credential in production.

## Local Demo Ticket Lookup

After seed:

- Ticket: `CF-2026-00001`
- E-mail: `juliana.martins@padariabona.com.br`

## Run The App

```bash
npm run dev
```

Open `http://localhost:3000`.

## Local Verification

```bash
npm run lint
npm run typecheck
npm run build
```

There is currently no automated test script.
