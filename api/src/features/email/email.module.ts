import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: Number(465),
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      },
      defaults: {
        from: '"Enroute University" <sdjs102@mailinator.com>',
      },
      template: {
        dir: __dirname.concat('templates'),
        adapter: new EjsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService],
})

export class EmailModule {}
