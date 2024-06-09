import { Body, Controller, Get, Param, Post } from "@nestjs/common"
import { ReplayService } from "./replay.service"


@Controller()
export class ReplayController {
  constructor(private readonly replayService:ReplayService) {}
  @Get('replay/uniquePost/:id')
   async getUniquePost(@Param('id') id: string){
    return await this.replayService.getUniqueReplay(id)
   }
}
