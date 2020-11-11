import { Module, Global } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MAILER_INTERCEPTOR } from './mailer.constant';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import * as hbs from 'nodemailer-express-handlebars';
import * as exphbs from 'express-handlebars';
import { join } from 'path';

@Global()
@Module({
  providers: [
    {
      provide: MAILER_INTERCEPTOR,
      useFactory: (config: ConfigService) => {
        const from = config.get<string>('mail.from');

        const transport = createTransport({
          host: config.get<string>('mail.host'),
          port: config.get<number>('mail.port'),
          secure: false,
          auth: {
            user: config.get<string>('mail.user'),
            pass: config.get<string>('mail.pass'),
          },
        } as SMTPTransport.Options);

        const hbs = {
          viewPath: join(__dirname, './templates'),
          extName: '.hbs',
          viewEngine: exphbs.create({
            extname: '.hbs',
            layoutsDir: join(__dirname, './templates/layouts/'),
            partialsDir: join(__dirname, './templates/partials/'),
            defaultLayout: 'default.layout.hbs', //
            helpers: {
              subtract: function() {
                return 'subtract';
              },
            },
          }),
        };
        return {
          transport,
          hbs,
          from,
        };
      },
      inject: [ConfigService],
    },
    MailerService,
  ],
  exports: [MailerService],
})
export class MailerModule {}
