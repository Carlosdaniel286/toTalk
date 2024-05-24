import { Body, Controller, Post } from '@nestjs/common';
import { ReplayService } from './replay.service';
import { CreateReplayDto } from './dto/replay.dto';

@Controller()
export class ReplayController {
  constructor(private readonly replayService: ReplayService) {}
  @Post('/replay')
   async createReplayController(@Body()createReplayDto:CreateReplayDto){
     return await this.replayService.createReaplyService(createReplayDto)
   }
}
