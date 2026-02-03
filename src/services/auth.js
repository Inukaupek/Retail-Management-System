import { fetchAuthSession } from "aws-amplify/auth";

export async function getAuthUser() {
  try {
    const session = await fetchAuthSession();
    const idToken = session.tokens?.idToken;

    if (!idToken) return null;

    const payload = idToken.payload;

    return {
      email: payload.email,
      role: payload["custom:role"],
      sub: payload.sub
    };
  } catch {
    return null;
  }
}

export async function isLoggedIn() {
  const user = await getAuthUser();
  return !!user;
}
