import { readFileSync } from 'fs';
import { sprintf } from 'sprintf-js';

export function mailerBuildTemplate (templateName : string, receivers, options : object = {}) : object {
  const dir = `${__dirname}/templates`;
  let template = JSON.parse(<any>readFileSync(`${dir}/${templateName}.json`));

  template.to = Array.isArray(receivers) ? receivers.join(', ') : receivers;
  template.subject = sprintf(template.subject, options);
  template.html = sprintf(template.html, options);

  return template;
}