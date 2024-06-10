import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FeedService } from './feed.service';


@Controller()
export class FeedController {
  constructor(private readonly feedService: FeedService) {}
 @Get('/feed')
  findAll() {
    return this.feedService.findAll();
  }

 
}
