import { Module, OnModuleInit } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MAILER_TRANSPORTER } from './mailer.constant';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import * as hbs from 'nodemailer-express-handlebars';
import * as exphbs from 'express-handlebars';
import { join } from 'path';

@Module({
  providers: [
    {
      provide: MAILER_TRANSPORTER,
      useFactory: (config: ConfigService) => {
        const transport = createTransport({
          host: config.get<string>('mail.host'),
          port: config.get<number>('mail.port'),
          secure: config.get<boolean>('mail.secure'),
          auth: {
            user: config.get<string>('mail.user'),
            pass: config.get<string>('mail.pass'),
          },
        } as SMTPTransport.Options);
        transport.use(
          'compile',
          hbs({
            viewPath: join(__dirname, './templates'),
            extName: '.hbs',
            viewEngine: exphbs.create({
              extname: '.hbs',
              layoutsDir: join(__dirname, './templates/layouts'),
              partialsDir: join(__dirname, './templates/partials'),
              defaultLayout: '', // default.layout.hbs
              helpers: {
                subtract: function() {
                  return 'subtract';
                },
              },
            }),
          }),
        );
        return transport;
      },
      inject: [ConfigService],
    },
    MailerService,
  ],
})
export class MailerModule implements OnModuleInit {
  constructor(private readonly mailerService: MailerService) {}

  onModuleInit() {
    this.mailerService.sendMailTest();
  }
}
