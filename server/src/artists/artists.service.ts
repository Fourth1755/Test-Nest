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

  async findOne(id: number): Promise<Artist>{
    try {
      const artistExist=await this.artistRepository.findOneOrFail({
        where:{
          id:id
        },
      });
      return artistExist;
    } catch (error) {
      throw error
    }
  }

  async update(id: number, updateArtistDto: UpdateArtistDto) {
    const artistExist = await this.artistRepository.findOneById(id);
    if(artistExist){
      await this.artistRepository.update(id,updateArtistDto)
      return await this.artistRepository.findOneById(id);
    }else{
      return `Can't find a #${id} artist`;
    }
  }

  async remove(id: number) {
    try {
      const animeExist = await this.artistRepository.findOneOrFail({
        where:{
          id:id
        },
      });
      await this.artistRepository.delete(id)
      return `Delete a ${id} artist successed`
    } catch (error) {
      throw error
    }
  }
}
