import { expect } from "@std/expect";
import { createSessionKeyAndIv, decodeSession, encodeSession } from "./session.ts";

Deno.test("encoding and decoding of sessions", async (t) => {
  const mySession = { userId: 165 };
  let encoded = "";
  const sessionKeyAndIv = await createSessionKeyAndIv("bGV0IHVzIGdvCg==")

  await t.step("encoding", async () => {
    encoded = await encodeSession(mySession, sessionKeyAndIv);

    expect(encoded).not.toBe(JSON.stringify(mySession));
  });

  await t.step("decoding", async () => {
    const decoded = await decodeSession(encoded, sessionKeyAndIv);

    expect(decoded).toEqual(mySession);
  });
});
