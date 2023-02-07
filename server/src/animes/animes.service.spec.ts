import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AnimesService } from './animes.service';
import { Anime } from './entities/anime.entity';

describe('AnimesService', () => {
  let service: AnimesService;
  const mockAnimeRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(anime => Promise.resolve({
      id:Date.now(), ...anime
    })),
    findOne: jest.fn().mockImplementation((name,dto)=>dto),
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
});
