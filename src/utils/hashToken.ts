import crypto from "crypto"

// Verification/reset tokens are emailed to the user in plaintext, but only the
// hash is persisted — a DB leak alone can't be used to hijack an account.
export function hashToken(token: string): string {
    return crypto.createHash("sha256").update(token).digest("hex")
}
