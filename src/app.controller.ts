import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(@Req() request, @Res() response): object {
    return response.status(200).json({ message: 'Express response' });
  }
}
