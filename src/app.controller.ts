import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from './shared/config/config.service';
import { MailService } from './shared/mail/mail.service';
import { TelegramService } from './shared/notification/telegram.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
    private readonly telegramService: TelegramService,
  ) {}

  @Get()
  getHello(): string {
    // const {user} = this.configService.gmailAccount;
    // const option = {
    //   from: `"👻👻👻👻" <${user}>`,
    //   to: 'quang.tran290699@hcmut.edu.vn',
    //   subject: 'Hello ✔',
    //   text: 'Hello world?',
    //   html: '<b>Hello world?</b>',
    // };
    // this.mailService.sendMail(option);
    this.telegramService.send('alo');
    return this.appService.getHello();
  }
}
