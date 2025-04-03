import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LinkEntity } from './entities/link.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LinkService {
    constructor(
        @InjectRepository(LinkEntity)
        private readonly linkRepository: Repository<LinkEntity>
    ){}
  async createShortLink(url: string){
    
  }
}
