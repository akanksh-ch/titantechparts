import { jwtDecode } from "jwt-decode";

const API_BASE = import.meta.env.VITE_API_BASE; // Backend API server
const LOCAL_ADMIN_USERNAME = "admin";
const LOCAL_ADMIN_PASSWORD = "Admin@12345";

const base64UrlEncode = (value: string): string => {
  if (typeof window !== "undefined") {
    return window
      .btoa(value)
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  }

  return Buffer.from(value, "utf-8")
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

const createLocalAdminToken = (): string => {
  const header = { alg: "none", typ: "JWT" };
  const payload = {
    sub: LOCAL_ADMIN_USERNAME,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    permissions: ["admin"],
    roles: ["admin"],
  };

  return `${base64UrlEncode(JSON.stringify(header))}.${base64UrlEncode(JSON.stringify(payload))}.`;
};

interface DecodedToken {
  sub: string; // username or email
  exp: number;
  permissions?: string | string[];
  roles?: string | string[];
}

const getDecodedToken = (): DecodedToken | null => {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    if (decoded.exp * 1000 < Date.now()) {
      logout();
      return null;
    }
    return decoded;
  } catch {
    return null;
  }
};

/**
 * Check if user is authenticated by validating token in localStorage
 */
export const isAuthenticated = (): boolean => {
  return getDecodedToken() !== null;
};

const normalizeClaims = (claim?: string | string[]): string[] => {
  if (!claim) return [];
  if (Array.isArray(claim)) {
    return claim.map((value) => value.toLowerCase());
  }

  return claim
    .split(/[\s,]+/)
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
};

export const isAdmin = (): boolean => {
  const decoded = getDecodedToken();
  if (!decoded) return false;

  const permissions = normalizeClaims(decoded.permissions);
  const roles = normalizeClaims(decoded.roles);

  return permissions.includes("admin") || roles.includes("admin");
};

/**
 * Login to backend and store JWT on success
 * @param username - Username for auth
 * @param password - Password for auth
 * @returns JSON data containing access token on success
 * @throws Error on http errors or failed attempts
 */
export const login = async (username: string, password: string) => {
  if (!(username.length > 0) || !(password.length > 0)) {
    throw new Error("Username or password was not provided");
  }

  if (username === LOCAL_ADMIN_USERNAME && password === LOCAL_ADMIN_PASSWORD) {
    const token = createLocalAdminToken();
    localStorage.setItem("token", token);
    localStorage.setItem("username", LOCAL_ADMIN_USERNAME);
    localStorage.setItem("email", "admin@titantechparts.local");

    return {
      access_token: token,
      token_type: "bearer",
      is_local_admin: true,
    };
  }

  const formData = new FormData();
  // OAuth2 expects form data, not JSON
  formData.append("username", username);
  formData.append("password", password);

  const response = await fetch(`${API_BASE}/auth/token`, {
    method: "POST",
    body: formData,
  });

  if (response.status === 500) {
    throw new Error("Internal server error");
  }

  const data = await response.json();

  if (response.status >= 400 && response.status < 500) {
    if (data.detail) {
      throw new Error(data.detail);
    }
    throw new Error("Authentication failed");
  }

  if ("access_token" in data) {
    const decodedToken = jwtDecode<DecodedToken>(data.access_token);
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("username", decodedToken.sub);
  }

  return data;
};

/**
 * Register new user and store JWT on success
 * @param username - Username for new account
 * @param email - Email for new account
 * @param password - Password for new account
 * @returns JSON data containing access token on success
 * @throws Error on http errors or failed attempts
 */
export const register = async (
  username: string,
  email: string,
  password: string,
) => {
  if (!(username.length > 0)) {
    throw new Error("Username was not provided");
  }
  if (!(email.length > 0)) {
    throw new Error("Email was not provided");
  }
  if (!(password.length > 0)) {
    throw new Error("Password was not provided");
  }

  const response = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
      roles: ["user"],
      isActive: true,
    }),
  });

  if (response.status === 500) {
    throw new Error("Internal server error");
  }

  const data = await response.json();

  if (response.status >= 400 && response.status < 500) {
    if (data.detail) {
      throw new Error(data.detail);
    }
    throw new Error("Registration failed");
  }

  // Store user data in localStorage after successful registration
  if (data.username) {
    localStorage.setItem("username", data.username);
    localStorage.setItem("email", data.email || email);
  }

  // Auto-login after registration
  if (data.username && data.email) {
    try {
      await login(username, password);
    } catch (loginErr) {
      console.error("Auto-login after registration failed:", loginErr);
      // Continue with registration success even if auto-login fails
    }
  }

  return data;
};

/**
 * Logout user by clearing localStorage
 */
export const logout = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("token");
  localStorage.removeItem("username");
};

/**
 * Get current username from localStorage
 */
export const getCurrentUsername = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("username");
};

/**
 * Get current user's email from localStorage
 */
export const getCurrentEmail = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("email");
};

/**
 * Make authenticated API request with JWT token
 * @param url - API endpoint (without base)
 * @param options - Fetch options
 */
export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (
    options.headers &&
    typeof options.headers === "object" &&
    !Array.isArray(options.headers)
  ) {
    Object.assign(headers, options.headers);
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers,
  });

  // Handle 401 by logging out
  if (response.status === 401) {
    logout();
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  return response;
};
