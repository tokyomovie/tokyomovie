import { expect } from "@std/expect";
import { decodeSession, encodeSession } from "./session.ts";

Deno.test("encoding and decoding of sessions", async (t) => {
  const mySession = { userId: 165 };
  let encoded = "";

  await t.step("encoding", async () => {
    encoded = await encodeSession(mySession);

    expect(encoded).not.toBe(JSON.stringify(mySession));
  });

  await t.step("decoding", async () => {
    const decoded = await decodeSession(encoded);

    expect(decoded).toEqual(mySession);
  });
});
