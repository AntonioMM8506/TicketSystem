import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventPayloads } from '@app/interface/event-types.interface';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  //OnEvent, calls the interface in order to know which parameters use for the mail
  //template population.
  @OnEvent('user.welcome')
  async welcomeEmail(data: EventPayloads['user.welcome']) {
    const { email, name } = data; //Gets the payload schema from the interfcae
    const subject = `Welcome to Enroute University: ${name}`; //Defines a Subject for the email

    await this.mailerService.sendMail({
      to: email,
      subject,
      template: __dirname.concat('/templates/welcome.ejs'), //Templates are stores and called from this folder
      context: {
        name, //Sends a context in order to populate the template in the case of using certain variables
      },
    });
  } //End of welcomeEmail

  @OnEvent('user.reset-password')
  async forgotPasswordEmail(data: EventPayloads['user.reset-password']) {
    const { name, email, link } = data;
    const subject = `Company: Reset Password`;

    await this.mailerService.sendMail({
      to: email,
      subject,
      template: __dirname.concat('/templates/forgot-password.ejs'),
      context: {
        link,
        name,
      },
    });
  }
} //End of forgotPasswordEmail
