// Sign up, log in and log out with Supabase Auth. The supabase-js library
// keeps the session in the browser and renews it before it expires.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export type Session = {
  email: string;
};

export function isConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_KEY);
}

let client: SupabaseClient | null = null;

function supabase(): SupabaseClient {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error("The site is not connected to Supabase yet.");
  }
  client ??= createClient(SUPABASE_URL, SUPABASE_KEY);
  return client;
}

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase().auth.signUp({ email, password });
  if (error) throw new Error(error.message);
  if (!data.session) {
    throw new Error("Account created, but it could not be signed in. Try logging in.");
  }
  return { email: data.session.user.email ?? email };
}

export async function logIn(email: string, password: string) {
  const { data, error } = await supabase().auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return { email: data.user.email ?? email };
}

export async function logOut() {
  await supabase().auth.signOut();
}

// Returns the saved session if there is a valid one, otherwise null.
export async function restoreSession(): Promise<Session | null> {
  const { data } = await supabase().auth.getSession();
  if (!data.session) return null;
  return { email: data.session.user.email ?? "" };
}
