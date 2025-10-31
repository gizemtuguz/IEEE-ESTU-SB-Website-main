const API_BASE =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ??
  "http://localhost:4000/api";

const ACCESS_TOKEN_KEY = "ieee_admin_token";

function getStoredToken() {
  if (typeof window === "undefined") {
    return null;
  }
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAuthToken(token: string | null) {
  if (typeof window === "undefined") {
    return;
  }
  if (token) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  } else {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }
}

export function clearAuthToken() {
  setAuthToken(null);
}

async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getStoredToken();
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    ...options
  });

  if (!response.ok) {
    const message = await response
      .json()
      .catch(() => ({ message: response.statusText }));
    throw new Error(message.message ?? "API request failed");
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export const api = {
  getEvents: () => apiFetch("/events"),
  getEvent: (slug: string) => apiFetch(`/events/${slug}`),
  getBlogPosts: () => apiFetch("/blog"),

  submitEventApplication: (slug: string, data: unknown) =>
    apiFetch(`/events/${slug}/applications`, {
      method: "POST",
      body: JSON.stringify(data)
    }),

  submitMembershipApplication: (data: unknown) =>
    apiFetch("/membership/apply", {
      method: "POST",
      body: JSON.stringify(data)
    }),

  submitCommitteeSelection: (data: unknown) =>
    apiFetch("/membership/committee", {
      method: "POST",
      body: JSON.stringify(data)
    }),

  submitSponsorshipLead: (data: unknown) =>
    apiFetch("/sponsorship", {
      method: "POST",
      body: JSON.stringify(data)
    }),

  submitContactMessage: (data: unknown) =>
    apiFetch("/contact", {
      method: "POST",
      body: JSON.stringify(data)
    }),

  subscribeToNewsletter: (data: unknown) =>
    apiFetch("/newsletter/subscribe", {
      method: "POST",
      body: JSON.stringify(data)
    }),

  authLogin: (data: unknown) =>
    apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(data)
    }),

  authRefresh: (data?: unknown) =>
    apiFetch("/auth/refresh", {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined
    }),

  authLogout: () =>
    apiFetch("/auth/logout", {
      method: "POST"
    }),

  getAdminEvents: () => apiFetch("/admin/events"),
  getAdminEvent: (id: string) => apiFetch(`/admin/events/${id}`),
  getAdminDashboard: () => apiFetch("/admin/dashboard/metrics"),

  createEvent: (data: unknown) =>
    apiFetch("/admin/events", {
      method: "POST",
      body: JSON.stringify(data)
    }),

  updateEvent: (id: string, data: unknown) =>
    apiFetch(`/admin/events/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data)
    })
};
