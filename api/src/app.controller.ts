import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

//File to manage the routes to use
//@Get / @Post / @Patch / @Delete
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

/*
//Test to manage versions
@Controller({
  version: '1'
})
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getHello(): string {
    return this.appService.getVersion()
  }
}
*/
