import { Injectable, Inject, Logger } from '@nestjs/common';
import { SendMailOptions } from 'nodemailer';
import { MAILER_INTERCEPTOR } from './mailer.constant';
import { Mailer } from './interfaces/mailer.interface';
import * as hbs from 'nodemailer-express-handlebars';
import * as exphbs from 'express-handlebars';
import { SentMessageInfo } from 'nodemailer/lib/smtp-connection';

@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name, true);

  constructor(@Inject(MAILER_INTERCEPTOR) private readonly mailer: Mailer) {}

  async sendMail(options: SendMailOptions): Promise<SentMessageInfo> {
    const result = await this.mailer.transport.sendMail(options);
    this.logger.log(result);
    return result;
  }

  async sendRegisterEmailTemplate(email: string): Promise<SentMessageInfo> {
    this.mailer.transport.use('compile', hbs(this.mailer.hbs));
    const mail = {
      from: this.mailer.from,
      to: email,
      subject: '注册',
      text: '请勿回复',
      template: 'test.template',
    };
    return this.sendMail(mail);
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
  }
}
