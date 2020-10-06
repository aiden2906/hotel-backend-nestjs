import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from './shared/config/config.service';
import { MailService } from './shared/mail/mail.service';
import * as Telegraf from 'telegraf';
import CustomCrypto from './shared/classes/crypto';
import { UserService } from './modules/user/services/user.service';

@Controller()
export class AppController implements OnModuleInit {
  constructor(
    private readonly appService: AppService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}
  onModuleInit(): any {
    const bot = new Telegraf.Telegraf(this.configService.telegram);
    const crypto = new CustomCrypto();
    bot.start(async (ctx: any) => {
      const { startPayload, message, update } = ctx;
      console.log('---- Context: ', ctx);
      console.log('---- Message: ', message);
      console.log('---- Update: ', update);
      let token;
      if (message.chat.type === 'private') {
        token = startPayload;
      } else {
        token = startPayload.split(' ')[1];
      }
      console.log('---- Token: ', token);
      const [iv, content] = token.split('-');
      const chatId = message.chat.id;
      const userId = crypto.decrypt({iv, content});
      const user = await this.userService.get(parseInt(userId));
      user.chatId = chatId;
      console.log('---- User: ', user);
      await this.userService.update(user.id, user);
      ctx.reply('Welcome To Booking Hotel Application');
    });
    bot.help(ctx => ctx.reply('Send me a sticker'));
    bot.on('sticker', ctx => ctx.reply('👍'));

    bot.on('text', ctx => {
      ctx.reply('👍');
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
