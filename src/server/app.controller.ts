import { Controller, Get, Render } from '@nestjs/common';

@Controller('app')
export class AppController {
  @Get()
  @Render('Index')
  index() {
    return {
      title: 'Next with Nest',
    };
  }
}
