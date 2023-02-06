import { Test, TestingModule } from '@nestjs/testing';
import { AnimesController } from './animes.controller';
import { AnimesService } from './animes.service';

describe('AnimesController', () => {
  let controller: AnimesController;
  let service: AnimesService;

  const mockAnimesService = {
    create: jest.fn(dto=>{
      return {
        id: Date.now(),
        ...dto
      }
    })
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnimesController],
      providers: [AnimesService],
    }).overrideProvider(AnimesService).useValue(mockAnimesService).compile();
    
    controller = module.get<AnimesController>(AnimesController);
  });
  
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should create a anime', () => {
    expect(controller.create({
      name:"Attack on Titan",
      episode:25,
      image:"https://cdn.myanimelist.net/images/anime/10/47347.jpg",
      year:2013,
      score:8
  })).toEqual({
    id:expect.any(Number),
    name: 'Attack on Titan',
    episode:25,
    image:"https://cdn.myanimelist.net/images/anime/10/47347.jpg",
    year:2013,
    score:8
  })
  });
});
