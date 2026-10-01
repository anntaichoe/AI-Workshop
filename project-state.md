# Project state
Last updated: 2026-10-01
## Works
A Next.js (App Router, TypeScript, plain CSS) site is live on Vercel at https://ai-workshop-pink-ten.vercel.app/. The GitHub repo (https://github.com/anntaichoe/AI-Workshop) is connected to that deployment.

A person can go to https://ai-workshop-pink-ten.vercel.app/study and create an account with an email and a password. Right after signing up, they see a page that says they are logged in, with their email and a Log out button. They stay logged in when they reload the page. They can log out, then log back in with the same email and password and reach the same logged-in page. If they type a wrong password, they see the message "Invalid login credentials" instead of being logged in.

## Broken or flaky
Nothing is broken yet — nothing has been built yet either. There is no sign-up, login, or task feature on the site. A Supabase project exists and is linked to the repo, but the site does not call it for anything yet.

## Environment notes
Stack is Next.js + TypeScript + plain CSS, deployed on Vercel. Supabase project is created and linked but unused. No environment variables or auth are configured in the app yet.

## Next session
Build Slice 1 from roadmap.md: sign-up and login using Supabase auth, wired into the live site, meeting all four of its done-criteria.
