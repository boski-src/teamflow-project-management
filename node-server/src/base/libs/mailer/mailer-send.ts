import { getTestMessageUrl } from 'nodemailer';
import { configLoader } from '../config-loader';

import { mailerBuildTemplate } from './mailer-build-template';
import { mailerTransport } from './mailer-transport';

export async function mailerSend (templateName, receivers : string | string[], options? : any) {
  let transporter : any = await mailerTransport(configLoader.get('application.mailer'));
  let template = mailerBuildTemplate(templateName, receivers, options);

  let info;
  try {
    info = await transporter.sendMail(template);
  }
  finally {
    transporter.close();
  }
  if (!info) throw false;

  console.log('[>] Mailer: ' + getTestMessageUrl(info));
  return info;
}