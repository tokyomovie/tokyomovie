import { create, getNumericDate, Payload, verify } from "djwt";

export const jwtKeyStorage: Record<number, CryptoKey> = {};

export async function createJwt(
  userId: number,
  data: Payload,
  expSeconds: number,
): Promise<string> {
  const key = await crypto.subtle.generateKey(
    { name: "HMAC", hash: "SHA-512" },
    true,
    ["sign", "verify"],
  );
  const jwt = await create({ alg: "HS512", typ: "JWT" }, {
    ...data,
    exp: getNumericDate(expSeconds),
    aud: ["user"],
  }, key);

  jwtKeyStorage[userId] = key;

  return jwt;
}

export async function verifyJwt(userId: number, jwt: string): Promise<Payload> {
  const key = jwtKeyStorage[userId];
  if (!key) throw Error("User has no associated jwt");

  return await verify(jwt, key);
}
