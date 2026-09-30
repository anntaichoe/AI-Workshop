"use client";

import { useEffect, useState } from "react";
import {
  isConfigured,
  logIn,
  logOut,
  restoreSession,
  signUp,
  type Session,
} from "./supabase-auth";
import "./study.css";

export default function StudyPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!isConfigured()) {
      setChecking(false);
      return;
    }
    restoreSession().then((s) => {
      setSession(s);
      setChecking(false);
    });
  }, []);

  return (
    <main className="study">
      <h1>Study tasks</h1>
      {!isConfigured() ? (
        <p className="study-error" role="alert">
          The site is not connected to Supabase yet, so sign-up and login
          are unavailable.
        </p>
      ) : checking ? (
        <p>Loading…</p>
      ) : session ? (
        <LoggedIn
          session={session}
          onLogOut={async () => {
            await logOut(session);
            setSession(null);
          }}
        />
      ) : (
        <AuthForm onSignedIn={setSession} />
      )}
    </main>
  );
}

function LoggedIn({
  session,
  onLogOut,
}: {
  session: Session;
  onLogOut: () => void;
}) {
  return (
    <div className="study-card">
      <p>
        You are logged in as <strong>{session.email}</strong>.
      </p>
      <button type="button" onClick={onLogOut}>
        Log out
      </button>
    </div>
  );
}

function AuthForm({ onSignedIn }: { onSignedIn: (s: Session) => void }) {
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const session =
        mode === "signup"
          ? await signUp(email, password)
          : await logIn(email, password);
      onSignedIn(session);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  function switchMode() {
    setMode(mode === "signup" ? "login" : "signup");
    setError("");
  }

  return (
    <form className="study-card" onSubmit={handleSubmit}>
      <h2>{mode === "signup" ? "Create an account" : "Log in"}</h2>

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        autoComplete={mode === "signup" ? "new-password" : "current-password"}
        required
        minLength={6}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && (
        <p className="study-error" role="alert">
          {error}
        </p>
      )}

      <button type="submit" disabled={busy}>
        {busy ? "Please wait…" : mode === "signup" ? "Sign up" : "Log in"}
      </button>

      <p className="study-switch">
        {mode === "signup" ? "Already have an account?" : "New here?"}{" "}
        <button type="button" className="study-link" onClick={switchMode}>
          {mode === "signup" ? "Log in" : "Sign up"}
        </button>
      </p>
    </form>
  );
}
