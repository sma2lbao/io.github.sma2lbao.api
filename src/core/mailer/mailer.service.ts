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
    return new Promise((resolve, reject) => {
      this.transport.sendMail(options, (error, response) => {
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
    const mail = {
      from: this.config.get<string>('mail.from'),
      to: 'sma2lbao@gmail.com',
      subject: 'test',
      text: '请勿回复',
      template: 'test.template',
    };
    const res: SentMessageInfo = await this.sendMail(mail);
    console.log('发送结果', res);
  }
}
