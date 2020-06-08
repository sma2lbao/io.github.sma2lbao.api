import { Injectable } from '@nestjs/common';
import { Transporter, createTransport, SendMailOptions } from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import SMTPTransport, { SentMessageInfo } from 'nodemailer/lib/smtp-transport';

@Injectable()
export class MailerService {
  constructor(private readonly transporter: Transporter) {}

  async sendMail(options: SendMailOptions): Promise<SentMessageInfo> {
    return await this.transporter.sendMail(options);
  }
}
