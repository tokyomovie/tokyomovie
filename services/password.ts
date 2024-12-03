import { User } from "#/database/query/user.ts";
import { createJwt } from "#/services/jwt.ts";
import { MailClient } from "#/services/mail.ts";

export async function startResetPasswordProcess(mail: MailClient, user: User) {
  const userId = user.id;
  const jwt = await createJwt(userId, {}, 60 * 15);
  const message = {
    to: user.email,
    subject: "Password change request at tokyomovie.group",
    text:
      `Hey, someone special from TokyoMovie.Group says you requested to change your password. So go over to http://localhost:8000/reset-password?u=${userId}&j=${jwt} to change it. This request will be invalid in fifteen minutes.
    
    If you didn't request this, then their may be an issue and you should probably get in contact with the tokyomovie.group administrator.`,
    html:
      `<p>Hey, someone special from TokyoMovie.Group says you requested to change your password. So <a href="http://localhost:8000/reset-password?u=${userId}&j=${jwt}">go over to https://tokyomovie.group</a> to change it. This request will be invalid in fifteen minutes.</p>
    </p>If you didn't request this, then their may be an issue and you should probably get in contact with the tokyomovie.group administrator.</p>`,
  };

  return await mail.send(message);
}
