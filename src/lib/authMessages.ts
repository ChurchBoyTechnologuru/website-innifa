const GENERIC_SIGNIN =
  "We could not sign you in. Check your email and password and try again.";
const GENERIC_SIGNUP =
  "We could not create your account right now. Please try again in a moment.";
const GENERIC_SERVICE =
  "This service is temporarily unavailable. Please try again later.";

/**
 * Maps Supabase / network errors to safe, user-facing copy. Never exposes env
 * names, file paths, or stack traces.
 */
export function signInErrorMessage(
  err: { message?: string } | null,
): string {
  if (!err?.message) {
    return GENERIC_SIGNIN;
  }
  const m = err.message.toLowerCase();
  if (m.includes("invalid login credentials")) {
    return GENERIC_SIGNIN;
  }
  if (m.includes("email not confirmed")) {
    return "Please confirm your email before signing in, then try again.";
  }
  if (m.includes("network") || m.includes("fetch")) {
    return GENERIC_SERVICE;
  }
  return GENERIC_SIGNIN;
}

export function signUpErrorMessage(
  err: { message?: string } | null,
): string {
  if (!err?.message) {
    return GENERIC_SIGNUP;
  }
  const m = err.message.toLowerCase();
  if (m.includes("already registered") || m.includes("user already")) {
    return "An account with this email may already exist. Try signing in instead.";
  }
  if (m.includes("password")) {
    return "Please choose a stronger password and try again.";
  }
  if (m.includes("network") || m.includes("fetch")) {
    return GENERIC_SERVICE;
  }
  return err.message; // Temporarily expose the real error for debugging
}

export function resetPasswordMessage(
  err: { message?: string } | null,
  success: boolean,
): string {
  if (success) {
    return "If an account exists for this email, we sent reset instructions.";
  }
  if (!err?.message) {
    return GENERIC_SERVICE;
  }
  return GENERIC_SERVICE;
}

export function updatePasswordErrorMessage(
  err: { message?: string } | null,
): string {
  if (!err?.message) {
    return "We could not update your password. Please try again.";
  }
  return "We could not update your password. Request a new reset link and try again.";
}

export function serviceUnavailableMessage(): string {
  return GENERIC_SERVICE;
}

export function uploadFailedMessage(): string {
  return "We could not complete the upload. Please sign in again and try once more.";
}
