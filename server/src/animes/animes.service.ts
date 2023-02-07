import { Injectable } from '@nestjs/common';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Anime } from './entities/anime.entity';

@Injectable()
export class AnimesService {
  constructor(
    @InjectRepository(Anime)
    private animeRepository: Repository<Anime>,
  ) {}
  async create(createAnimeDto: CreateAnimeDto) {
    const animeExist = await this.animeRepository.findOne({
      where:{
        name:createAnimeDto.name,
      },
    });
    if(animeExist){
      return animeExist;
    }
    return await this.animeRepository.save(createAnimeDto);
  }

  findAll() {
    return this.animeRepository.find();
  }

  findOne(id: number) {
    return this.animeRepository.findOneById(id);
  }

  async update(id: number, updateAnimeDto: UpdateAnimeDto) {
    const animeExist = await this.animeRepository.findOne({
      where:{
        id:id
      },
    });
    if(animeExist){
      return await this.animeRepository.update(id,updateAnimeDto)
    }else{
      return `Can't find a #${id} anime`;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} anime`;
  }
}
