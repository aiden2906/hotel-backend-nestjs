/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import * as nodeMailerHtmlText from 'nodemailer-html-to-text';
import nodemailer = require('nodemailer');
import * as path from 'path';
import util = require('util');
import * as ejs from 'ejs';


const promisify = util.promisify;
interface MailOption {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
}

export enum EMAIL_TEMPLATE {
  EMAIL_CONFIRM = 'email-confirm',
}

@Injectable()
export class MailService {
  private templateDir = '';
  constructor(private readonly configService: ConfigService) {
    this.templateDir = path.join(__dirname, './templates');
  }

  getTransport() {
    const { user, pass } = this.configService.gmailAccount;
    const transporter = nodemailer.createTransport({
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
    transporter.use('compile', nodeMailerHtmlText.htmlToText());
    return transporter;
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

  public toHtml(templateName: EMAIL_TEMPLATE, data: any) {
    if (!this.templateDir) {
      throw Error('missing_template_dir');
    }

    const filename = templateName;
    const locals = Object.assign(data || {});
    const templatePath = path.join(this.templateDir, `${filename}.ejs`);
    console.log(templatePath)
    return promisify(ejs.renderFile)(templatePath, locals, {});
  }

  async send(
    eTemplate: EMAIL_TEMPLATE,
    options: {
      to: string;
      subject: string;
      data: any;
    },
  ) {
    const { user } = this.configService.gmailAccount;
    const html = await this.toHtml(eTemplate, options.data || {});
    const email: MailOption = {
      from: `"👻👻👻👻" <${user}>`,
      to: options.to,
      subject: options.subject,
      text: '',
      html,
    };

    try {
      const rs = await this.sendMail(email);
      return rs;
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  }
}
