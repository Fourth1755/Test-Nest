import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistsService {    
  constructor(
    @InjectRepository(Artist)
      private artistRepository: Repository<Artist>,
    ) {}
    async create(createArtistDto: CreateArtistDto) {
    const artistExist = await this.artistRepository.findOne({
      where:{
        name:CreateArtistDto.name,
      },
    });
    if(artistExist){
      return artistExist;
    }
    const newArtist = this.artistRepository.create(createArtistDto)
    return await this.artistRepository.save(newArtist);
  }

  findAll() {
    return this.artistRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} artist`;
  }

  update(id: number, updateArtistDto: UpdateArtistDto) {
    return `This action updates a #${id} artist`;
  }

  remove(id: number) {
    return `This action removes a #${id} artist`;
  }
}
