// Talks to Supabase Auth over its REST API with plain fetch, so no extra
// package is needed. The session is kept in the browser's localStorage.

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const STORAGE_KEY = "study-session";

export type Session = {
  access_token: string;
  refresh_token: string;
  email: string;
};

export function isConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_KEY);
}

async function authRequest(
  path: string,
  init: { method: string; body?: unknown; accessToken?: string },
) {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error("The site is not connected to Supabase yet.");
  }
  const headers: Record<string, string> = {
    apikey: SUPABASE_KEY,
    "Content-Type": "application/json",
  };
  if (init.accessToken) headers.Authorization = `Bearer ${init.accessToken}`;

  let res: Response;
  try {
    res = await fetch(`${SUPABASE_URL}/auth/v1/${path}`, {
      method: init.method,
      headers,
      body: init.body ? JSON.stringify(init.body) : undefined,
    });
  } catch {
    throw new Error("Could not reach the server. Check your connection.");
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message =
      data.msg || data.error_description || data.message || data.error;
    throw new Error(message || `Something went wrong (error ${res.status}).`);
  }
  return data;
}

function toSession(data: {
  access_token?: string;
  refresh_token?: string;
  user?: { email?: string };
}): Session | null {
  if (!data.access_token || !data.refresh_token) return null;
  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    email: data.user?.email ?? "",
  };
}

function save(session: Session) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

function clear() {
  localStorage.removeItem(STORAGE_KEY);
}

export async function signUp(email: string, password: string) {
  const data = await authRequest("signup", {
    method: "POST",
    body: { email, password },
  });
  const session = toSession(data);
  if (!session) {
    throw new Error("Account created, but it could not be signed in. Try logging in.");
  }
  save(session);
  return session;
}

export async function logIn(email: string, password: string) {
  const data = await authRequest("token?grant_type=password", {
    method: "POST",
    body: { email, password },
  });
  const session = toSession(data);
  if (!session) throw new Error("Login failed. Please try again.");
  save(session);
  return session;
}

export async function logOut(session: Session) {
  clear();
  // Also end the session on the server; ignore failures, the browser copy is gone.
  await authRequest("logout", {
    method: "POST",
    accessToken: session.access_token,
  }).catch(() => {});
}

// Reads the saved session and checks it is still valid, refreshing it if the
// short-lived access token has expired. Returns null if there is no valid session.
export async function restoreSession(): Promise<Session | null> {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  let saved: Session;
  try {
    saved = JSON.parse(raw);
  } catch {
    clear();
    return null;
  }

  try {
    const user = await authRequest("user", {
      method: "GET",
      accessToken: saved.access_token,
    });
    return { ...saved, email: user.email ?? saved.email };
  } catch {
    // Access token expired or invalid; try the refresh token once.
  }

  try {
    const data = await authRequest("token?grant_type=refresh_token", {
      method: "POST",
      body: { refresh_token: saved.refresh_token },
    });
    const session = toSession(data);
    if (session) {
      save(session);
      return session;
    }
  } catch {
    // Refresh failed too; fall through and sign out locally.
  }
  clear();
  return null;
}
