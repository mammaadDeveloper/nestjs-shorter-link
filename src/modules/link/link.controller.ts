import { Body, Controller, Post } from '@nestjs/common';
import { LinkService } from './link.service';

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post()
  async createShortLink(@Body('url') url: string){
    
  }
}
