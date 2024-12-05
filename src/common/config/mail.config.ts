import { ConfigService } from '@nestjs/config';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { join } from 'path';

export const getMailConfig = async (config: ConfigService) => ({
  transport: {
    host: config.get('MAIL_HOST'),
    secure: true,
    auth: {
      user: config.get('SMTP_USERNAME'),
      pass: config.get('SMTP_PASSWORD'),
    },
  },
  defaults: {
    from: `"Traineeship - Final task" <${config.get('SMTP_USERNAME')}>`,
  },
  template: {
    dir: join(__dirname, '../../mail/templates'),
    adapter: new EjsAdapter(),
    options: {
      strict: false,
    },
  },
});
