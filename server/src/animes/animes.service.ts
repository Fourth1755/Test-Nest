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
    const newAnime = this.animeRepository.create(createAnimeDto)
    return await this.animeRepository.save(newAnime);
  }

  findAll() {
    return this.animeRepository.find();
  }

  async findOne(id: number): Promise<Anime>{
    try {
      const animeExist=await this.animeRepository.findOneOrFail({
        where:{
          id:id
        },
      });
      return animeExist;
    } catch (error) {
      throw error
    }
  }

  async update(id: number, updateAnimeDto: UpdateAnimeDto) {
    const animeExist = await this.animeRepository.findOneById(id);
    if(animeExist){
      await this.animeRepository.update(id,updateAnimeDto)
      return await this.animeRepository.findOneById(id);
    }else{
      return `Can't find a #${id} anime`;
    }
  }

  async remove(id: number) {
    try {
      const animeExist = await this.animeRepository.findOne({
        where:{
          id:id
        },
      });
      return await this.animeRepository.delete(id)
    } catch (error) {
      throw error
    }
  }
}
