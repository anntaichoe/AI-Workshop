# CLAUDE.md

## Stack
Next.js (App Router), TypeScript, plain CSS, Supabase (auth and data), deployed on Vercel.

## Commands
- `npm run dev` — run the site locally
- `npm run build` — production build
- `npm run lint` — lint the code

## Never
- Add a dependency without asking first. If a task would normally use a package, stop and ask before writing code: quote this rule, name each package, and say in one sentence what it does and why the task needs it. Do not get around this rule by hand-writing a replacement for the package.
- Edit .env or any environment variable.
- Change auth configuration without saying what is changing and why.
- Create new top-level folders.

## Conventions
Plain CSS only, no CSS framework. Keep components small and colocated with the page that uses them. No real personal data anywhere in the app — fake names and fake content only.

## Current focus
See roadmap.md. Work only on the slice marked ACTIVE.

## Before you open a pull request
Update roadmap.md and project-state.md to match what you just did, and include both in the same pull request:
- roadmap.md: change the slice you built from ACTIVE to DONE, and the next pending slice to ACTIVE.
- project-state.md: set Last updated to today's date, and rewrite Works, Broken or flaky, Environment notes and Next session so each one is true once this pull request is merged. Write Works as plain sentences about what a person can do on the live site.
In your final reply, say that you updated both files.
