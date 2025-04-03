import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LinkEntity } from './entities/link.entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';

@Injectable()
export class LinkService {
    constructor(
        @InjectRepository(LinkEntity)
        private readonly linkRepository: Repository<LinkEntity>
    ){}
  async createShortLink(url: string): Promise<LinkEntity>{
    const shortCode = crypto.randomBytes(3).toString('hex');
    const shortLink = this.linkRepository.create({originalUrl: url, shortCode});
    await this.linkRepository.save(shortLink);
    return shortLink;
  }

  async getOriginalUrl(shortCode: string): Promise<string | null>{
    const link = await this.linkRepository.findOne({where: {shortCode}});
    return link? link.originalUrl: null;
  }
}
