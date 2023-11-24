import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventPayloads } from '@app/interface/event-types.interface';


@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  @OnEvent('user.welcome')
  async welcomeEmail(data: EventPayloads['user.welcome']) {
    const { email, name } = data;

    const subject = `Welcome to Enroute University: ${name}`;

    await this.mailerService.sendMail({
      to: email,
      subject,
      template: __dirname.concat("/templates/welcome.ejs"), 
      context: {
        name
      },
    });
  }
  
  @OnEvent('user.reset-password')
  async forgotPasswordEmail(data: EventPayloads['user.reset-password']) {
    const { name, email, link } = data;

    const subject = `Company: Reset Password`;

    await this.mailerService.sendMail({
      to: email,
      subject,
      template: __dirname.concat("/templates/forgot-password.ejs"),
      context: {
        link,
        name,
      },
    });
  }

}
