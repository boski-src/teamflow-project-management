import { createTestAccount, createTransport, TestAccount } from 'nodemailer';

export async function mailerTransport (config? : TestAccount | any) {
  let account = config ? config : await createTestAccount();

  return createTransport(
    {
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass
      },
      logger: false,
      debug: false
    },
    {
      from: `${account.from}<${account.user}>`
    }
  );
}