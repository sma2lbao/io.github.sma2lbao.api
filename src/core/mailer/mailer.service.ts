import { Injectable, Inject } from '@nestjs/common';
import { Transporter, SendMailOptions } from 'nodemailer';
import { SentMessageInfo } from 'nodemailer/lib/smtp-transport';
import { MAILER_TRANSPORTER } from './mailer.constant';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailerService {
  constructor(
    @Inject(MAILER_TRANSPORTER) private readonly transport: Transporter,
    private readonly config: ConfigService,
  ) {}

  async sendMail(options: SendMailOptions): Promise<SentMessageInfo> {
    return await this.transport.sendMail(options);
  }

  sendMailTest() {
    this.transport.sendMail({
      from: this.config.get<string>('mail.from'),
      to: 'sma2lbao@gmail.com',
      subject: 'test',
      text: '请勿回复',
      template: 'test.template',
    });
  }
}
