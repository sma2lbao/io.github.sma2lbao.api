import { Transporter } from 'nodemailer';

export interface Mailer {
  transport: Transporter;
  hbs: any;
  from: string;
}
