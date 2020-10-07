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

  async send(obj: any, chatId: string) {
    const {name, fullname, date, email, phone} = obj;
    const message = `
Tên khách sạn: ${name}
Tên khách hàng: ${fullname}
Địa chỉ email: ${email}
Số điện thoại: ${phone}
Ngày đặt đơn: ${date}
    `;
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
