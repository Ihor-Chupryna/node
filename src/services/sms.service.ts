import { Twilio } from "twilio";

import { configs } from "../configs";
import { smsTemplates } from "../constants";
import { ESmsActions } from "../enums";

class SmsService {
  constructor(
    private client = new Twilio(
      configs.TWILIO_ACCOUNT_SID,
      configs.TWILIO_AUTH_TOKEN
    )
  ) {}

  public async sendSms(phone: string, smsActions: ESmsActions) {
    try {
      const message = smsTemplates[smsActions];

      await this.client.messages.create({
        body: message,
        to: phone,
        messagingServiceSid: configs.TWILIO_SERVICE_SID,
      });
    } catch (e) {
      console.error(e.message);
    }
  }
}

export const smsService = new SmsService();
