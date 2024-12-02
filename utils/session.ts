import { decodeBase64, encodeBase64 } from "@std/encoding";
import { Session } from "#/types/request.ts";

/**
 * Memo
 * Basic good enough session symmetric encryption using AES-CBC
 *
 * The session data will not hold sensitive information, nevertheless
 * it is good to do some basic encryption of sessions. If session data
 * ever has to hold any sensitive data, consider a more thorough solution.
 * I.e. not rolling our own.
 */

const te = (s: string) => new TextEncoder().encode(s);
const td = (d: Uint8Array) => new TextDecoder().decode(d);

export type SessionKeyAndIv = {
  key: CryptoKey;
  iv: Uint8Array;
};

export async function createSessionKeyAndIv(
  sessionToken: string,
): Promise<SessionKeyAndIv> {
  const rawKey = te(sessionToken);
  const key = await crypto.subtle.importKey(
    "raw",
    rawKey.buffer,
    "AES-CBC",
    true,
    ["encrypt", "decrypt"],
  );

  return { key, iv: new Uint8Array(16) };
}

export async function encodeSession(
  session: Session,
  { key, iv }: SessionKeyAndIv,
): Promise<string> {
  if (!session.userId) {
    throw Error(`invalid session of: ${JSON.stringify(session)}`);
  }

  const sessionJson = JSON.stringify(session);
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-CBC", iv },
    key,
    te(sessionJson),
  );
  const encryptedBytes = new Uint8Array(encrypted);

  return encodeBase64(encryptedBytes);
}

export async function decodeSession(
  encoded: string,
  { key, iv }: SessionKeyAndIv,
): Promise<Session> {
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-CBC", iv },
    key,
    decodeBase64(encoded),
  );
  const decryptedBytes = new Uint8Array(decrypted);
  const decryptedJson = td(decryptedBytes);
  const session = JSON.parse(decryptedJson) as Session;

  if (!session.userId) {
    throw Error(`invalid decoded session of: ${decryptedJson}`);
  }

  return session;
}
