export const getToken = (parsed: boolean = false): string | object | null => {
  const hostTokenKey = "access_token";
  const token = localStorage.getItem(hostTokenKey);
  return parsed ? (token ? JSON.parse(token) : {}) : token;
};

export const setToken = (tokenData: string): void => {
  localStorage.setItem("access_token", tokenData);
};

export const removeToken = (): void => {
  localStorage.removeItem("access_token");
  sessionStorage.removeItem("userTemplates");
};

export const parseJwt = (token: string): Record<string, unknown> => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Invalid JWT token", error);
    return {};
  }
};

export const getAuthHeader = (): Record<string, string> => {
  let user: { access_token?: string } | null = getToken(true) as {
    access_token?: string;
  } | null;
  // if (!user) {
  //   const sessionToken = sessionStorage.getItem("access_token");
  //   user = sessionToken ? JSON.parse(sessionToken) : null;
  // }

  return user && user?.access_token
    ? { Authorization: `Bearer ${user.access_token}` }
    : {};
};
