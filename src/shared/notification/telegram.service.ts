/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import Axios from 'axios';
@Injectable()
export class TelegramService {
  private request: any;
  constructor(private readonly configService: ConfigService) {
    this.request = Axios.create();
  }

  async send(message: string, chatId: string) {
    const telegram = this.configService.telegram;
    const url = `https://api.telegram.org/bot${telegram}/sendMessage`;
    const data = {
      chat_id: chatId,
      text: message,
    };
    this.request
      .post(url, data)
      .then(_ => console.log('---- Send message to Telegram successful'))
      .catch(err => console.log('---- Send message to Telegram failed: ', err));
  }
}
