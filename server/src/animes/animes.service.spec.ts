import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AnimesService } from './animes.service';
import { Anime } from './entities/anime.entity';

describe('AnimesService', () => {
  let service: AnimesService;
  const mockAnimeRepository = {
    create: jest.fn().mockImplementation(dto => Promise.resolve({
      id:Date.now(),
      ...dto,
    })),
    save: jest.fn().mockImplementation(anime => Promise.resolve(
      anime
    )),
    findOne: jest.fn().mockImplementation(({where:{name,id}},dto)=>{
      if(id==1){
        return Promise.resolve({
          id: 1,
          name:"Attack on Titan",
          episode:25,
          image:"https://cdn.myanimelist.net/images/anime/10/47347.jpg",
          year:2013,
          score:8
        })
      }else{
        return Promise.resolve(dto)
      }
    }),
    findOneById: jest.fn().mockImplementation((id)=>{
      if(id==1){
        return Promise.resolve({
          id: 1,
          name:"Attack on Titan",
          episode:25,
          image:"https://cdn.myanimelist.net/images/anime/10/47347.jpg",
          year:2013,
          score:8
        })
      }
    }),
    findOneOrFail: jest.fn().mockImplementation(({where:{name,id}})=>{
      if(id==1){
        return Promise.resolve({
          id: 1,
          name:"Attack on Titan",
          episode:25,
          image:"https://cdn.myanimelist.net/images/anime/10/47347.jpg",
          year:2013,
          score:8
        })
      }else{
        return 'error'
      }
    }),
    update: jest.fn((id,dto)=>({
      id,
      ...dto,
    })),
    delete: jest.fn((id)=>id)
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimesService, {
        provide: getRepositoryToken(Anime),
        useValue: mockAnimeRepository
      }],
    }).compile();

    service = module.get<AnimesService>(AnimesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create a new anime record and return that',async () => {
    expect(await service.create({
      name:"Attack on Titan",
      episode:25,
      image:"https://cdn.myanimelist.net/images/anime/10/47347.jpg",
      year:2013,
      score:8
  })).toEqual({
    id: expect.any(Number),
    name:"Attack on Titan",
    episode:25,
    image:"https://cdn.myanimelist.net/images/anime/10/47347.jpg",
    year:2013,
    score:8
  });
  });
  it('should update a anime',async () => {
    expect(await service.update(1,{
      name:"Attack on Titan",
      episode:25,
      image:"https://cdn.myanimelist.net/images/anime/10/47347.jpg",
      year:2013,
      score:8
    })).toEqual({
      id: 1,
      name:"Attack on Titan",
      episode:25,
      image:"https://cdn.myanimelist.net/images/anime/10/47347.jpg",
      year:2013,
      score:8
    })
  })
  it('should get anime by id',async () => {
    expect(await service.findOne(1)).toEqual({
      id: 1,
      name:"Attack on Titan",
      episode:25,
      image:"https://cdn.myanimelist.net/images/anime/10/47347.jpg",
      year:2013,
      score:8
    })
  })
  it('should delete anime by id',async () => {
    expect(await service.remove(1)).toEqual(
      'Delete a 1 anime successed'
    )
  })
});
