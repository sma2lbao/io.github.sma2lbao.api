import { Injectable, Inject } from '@nestjs/common';
import { SendMailOptions } from 'nodemailer';
import { SentMessageInfo } from 'nodemailer/lib/smtp-transport';
import { MAILER_INTERCEPTOR } from './mailer.constant';
import { Mailer } from './interfaces/mailer.interface';
import * as hbs from 'nodemailer-express-handlebars';
import * as exphbs from 'express-handlebars';

@Injectable()
export class MailerService {
  constructor(@Inject(MAILER_INTERCEPTOR) private readonly mailer: Mailer) {}

  async sendMail(options: SendMailOptions): Promise<SentMessageInfo> {
    return new Promise((resolve, reject) => {
      this.mailer.transport.sendMail(options, (error, response) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async sendMailTest() {
    this.mailer.transport.use('compile', hbs(this.mailer.hbs));
    const mail = {
      from: this.mailer.from,
      to: 'sma2lbao@gmail.com',
      subject: 'test',
      text: '请勿回复',
      template: 'test.template',
    };
    const res: SentMessageInfo = await this.sendMail(mail);
    console.log('发送结果', res);
  }
}
