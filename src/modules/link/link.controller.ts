import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Res, UsePipes } from '@nestjs/common';
import { LinkService } from './link.service';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ValidateUrlPipe } from '../../common/pipes/validate-url.pipe';
import { BaseResponse } from '../../shared/interfaces/response.interface';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('link')
export class LinkController {
  constructor(
    private readonly configService: ConfigService,
    private readonly linkService: LinkService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(ValidateUrlPipe)
  @ApiOperation({ summary: 'Create a short link for the provided URL' })
  @ApiBody({
    description: 'The URL to be shortened',
    type: String,
    examples: {
      link: {
        value: 'https://google.com',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The short link has been created successfully',
    schema: {
      example: {
        success: true,
        status: HttpStatus.CREATED,
        message: 'Operation successful!',
        data: {
          link: 'https://your-app-url/abcd1234',
        },
      },
    },
  })
  async createShortLink(
    @Body('url') url: string,
  ): Promise<BaseResponse<{ link: string }>> {
    const link = await this.linkService.createShortLink(url);
    return {
      success: true,
      status: HttpStatus.CREATED,
      message: 'Operation successful!',
      data: {
        link: `${this.configService.get('app.url')}/${link.shortCode}`,
      },
    };
  }

  @Get(':code')
  @ApiOperation({
    summary: 'Redirect to the original URL based on short link code',
  })
  @ApiParam({
    name: 'code',
    description: 'The short link code to be redirected',
    required: true,
    type: String,
    examples: {
      shortCodeExample: {
        value: 'abcd1234',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.FOUND,
    description: 'Redirected to the original URL successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'The short link was not found',
    schema: {
      example: {
        success: false,
        status: HttpStatus.NOT_FOUND,
        message: 'Link not found!',
      },
    },
  })
  async getOriginalUrl(
    @Param('code') code: string,
    @Res() res: Response,
  ): Promise<Response | void> {
    const link = await this.linkService.getOriginalUrl(code);

    if (link) return res.redirect(link);

    return res.status(HttpStatus.NOT_FOUND).json({
      success: false,
      status: HttpStatus.NOT_FOUND,
      message: 'Link not found!',
    });
  }
}
