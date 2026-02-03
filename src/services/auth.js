import { getCurrentUser, fetchAuthSession, signOut } from "aws-amplify/auth";

/**
 * Get authenticated user + role
 * Used in Navbar, protected actions
 */
export const getAuthUser = async () => {
  try {
    // 🔥 Ensure user exists
    const user = await getCurrentUser();

    // 🔥 Force session hydration (important!)
    const session = await fetchAuthSession({ forceRefresh: true });

    const idToken = session.tokens?.idToken;
    const accessToken = session.tokens?.accessToken;

    if (!idToken) return null;

    const payload = idToken.payload;

    return {
      userId: payload.sub,
      email: payload.email,
      role: payload["custom:role"] || "customer",
      idToken: idToken.toString(),
      accessToken: accessToken?.toString()
    };
  } catch (err) {
    return null;
  }
};

/**
 * Simple auth check
 */
export const isAuthenticated = async () => {
  try {
    await getCurrentUser();
    return true;
  } catch {
    return false;
  }
};

/**
 * Logout
 */
export const logout = async () => {
  await signOut();
};
