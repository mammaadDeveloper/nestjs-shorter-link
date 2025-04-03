import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Res, UsePipes } from '@nestjs/common';
import { LinkService } from './link.service';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ValidateUrlPipe } from '../../common/pipes/validate-url.pipe';

interface BaseResponse<T> {
  success: boolean,
  status: number,
  message: string,
  data?: T
};
@Controller('link')
export class LinkController {
  constructor(
    private readonly configService: ConfigService,
    private readonly linkService: LinkService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(ValidateUrlPipe)
  async createShortLink(@Body('url') url: string): Promise<BaseResponse<{link: string}>>{
    const link = await this.linkService.createShortLink(url);
    return {
      success: true,
      status: HttpStatus.CREATED,
      message: 'Operation successful!',
      data: {
        link: `${this.configService.get('app.url')}/${link.shortCode}`
      }
    };
  }

  @Get(':code')
  async getOriginalUrl(@Param('code') code: string, @Res() res: Response): Promise<Response | void>{
    const link = await this.linkService.getOriginalUrl(code);

    if(link)
      return res.redirect(link);

    return res.status(HttpStatus.NOT_FOUND).json({
      success: false,
      status: HttpStatus.NOT_FOUND,
      message: 'Link not found!'
    });
  }
}
