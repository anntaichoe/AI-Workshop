# Project state
Last updated: 2026-10-01
## Works
A Next.js (App Router, TypeScript, plain CSS) site is live on Vercel at https://ai-workshop-pink-ten.vercel.app/. The GitHub repo (https://github.com/anntaichoe/AI-Workshop) is connected to that deployment.

A person can go to https://ai-workshop-pink-ten.vercel.app/study and create an account with an email and a password. Right after signing up, they see a page that says they are logged in, with their email and a Log out button. They can log out, then log back in with the same email and password. If they type a wrong password, they see the message "Invalid login credentials" instead of being logged in.

Once logged in, a person can type a study task and click Add, and it appears in their list under "Your tasks". The list is still there after they reload the page, and after they log out and log back in. Each account sees only its own tasks; a new account starts with "No tasks yet."

## Broken or flaky
No known bugs in sign-up, log-in or the task list. Known gaps:
- The homepage still shows the personal page and does not link to /study, so a visitor has to type /study to find the sign-up form.
- CLAUDE.md lists `npm run lint`, but package.json has no lint command, so it fails.
- `npm audit` reports 2 warnings from Next.js and PostCSS. They were there before Slice 1, and fixing them needs a major Next.js upgrade.
- Tasks cannot be marked done, edited or deleted yet (these are in the Backlog).

## Environment notes
Stack is Next.js + TypeScript + plain CSS, deployed on Vercel. Sign-up, log-in and tasks use Supabase through `@supabase/supabase-js`, the only package added so far. The code is in app/study: supabase-auth.ts (log-in), tasks.ts (reading and adding tasks) and task-list.tsx (the task list on the page). NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY are set in Vercel; do not create, edit or print them. Email confirmation is turned off in Supabase, so a new account can log in straight away. The login is kept in the browser and checked there, not on the server.

The Supabase database has one table, `public.tasks`, with the columns id, user_id, title and created_at. It was created by pasting SQL into the Supabase SQL Editor; there are no migration files in the repo. Row level security is on: a logged-in person can only read and add rows whose user_id is their own. Any change to the table goes the same way: put the SQL in the reply for the owner to run, and do not run it yourself.

## Next session
Build Slice 3 from roadmap.md on the /study page: when adding a task, the person picks a language skill from a fixed list, each task shows its skill tag, and the list can be filtered to one skill. Storing the skill needs a new column on the `tasks` table; write that SQL in the reply for the owner to run in the Supabase SQL Editor, and do not add a migration file or run it yourself.
