import { Controller, Get, Req } from '@nestjs/common';
import { FeedService } from './feed.service';


@Controller()
export class FeedController {
  constructor(private readonly feedService: FeedService) {}
 @Get('/feed')
  findAll(@Req() req:Request) {
    const authorId = req['user'] as number
    return this.feedService.findAll(authorId);
  }

 
}
