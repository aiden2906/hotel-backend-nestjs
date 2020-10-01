/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import nodemailer = require('nodemailer');

interface MailOption {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
}

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {}

  getTransport() {
    const { user, pass } = this.configService.gmailAccount;
    return nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      service: 'gmail',
      ignoreTLS: false,
      secure: false,
      auth: {
        user,
        pass,
      },
    });
  }

  async sendMail(option: MailOption) {
    const transport = this.getTransport();
    const info = await transport.sendMail(option, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Email sent: ', info.response);
      }
    });
    return info;
  }
}
