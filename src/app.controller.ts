import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from './shared/config/config.service';
import { MailService } from './shared/mail/mail.service';
import { TelegramService } from './shared/notification/telegram.service';
import * as Telegraf from 'telegraf';
import CustomCrypto from './shared/classes/crypto';

@Controller()
export class AppController implements OnModuleInit {
  constructor(
    private readonly appService: AppService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}
  onModuleInit(): any {
    const bot = new Telegraf.Telegraf(this.configService.telegram);
    console.log('---- Initial telegram bot');
    const crypto = new CustomCrypto();
    bot.start((ctx: any) => {
      console.log('---- Context: ', ctx);
      const { startPayload, message } = ctx;
      const chatId = message.chat.id;
      const plainPayload = crypto.decrypt(startPayload);
      console.log('---- Id: ', plainPayload);

      ctx.reply('Welcome To Booking Hotel Application');
    });
    bot.help(ctx => ctx.reply('Send me a sticker'));
    bot.on('sticker', ctx => ctx.reply('👍'));

    bot.on('text', ctx => {
      ctx.reply('👍');
      console.log(ctx.update);
    });

    bot.hears('hi', ctx => ctx.reply('Hey there'));
    bot.launch();
  }

  @Get()
  getHello(): string {
    const { user } = this.configService.gmailAccount;
    const option = {
      from: `"👻👻👻👻" <${user}>`,
      to: 'quang.tran290699@hcmut.edu.vn',
      subject: 'Hello ✔',
      text: 'Hello world?',
      html: '<b>Hello world?</b>',
    };
    this.mailService.sendMail(option);
    return this.appService.getHello();
  }
}
