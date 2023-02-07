import { Test, TestingModule } from '@nestjs/testing';
import { AnimesController } from './animes.controller';
import { AnimesService } from './animes.service';

describe('AnimesController', () => {
  let controller: AnimesController;

  const mockAnimesService = {
    create: jest.fn(dto=>{
      return {
        id: Date.now(),
        ...dto
      }
    }),
    update: jest.fn((id,dto)=>({
      id,
      ...dto,
    })),
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
    const dto = {
      name:"Attack on Titan",
      episode:25,
      image:"https://cdn.myanimelist.net/images/anime/10/47347.jpg",
      year:2013,
      score:8
  }
    expect(controller.create(dto)).toEqual({
      id:expect.any(Number),
      ...dto
    });
    expect(mockAnimesService.create).toHaveBeenCalledWith(dto)
  });
  it('should update a anime',()=>{
    const dto = {
      name:"Attack on Titan",
      episode:25,
      image:"https://cdn.myanimelist.net/images/anime/10/47347.jpg",
      year:2013,
      score:8
    };
    expect(controller.update('1',dto)).toEqual({
      id: 1,
      ...dto
    });
    expect(mockAnimesService.update).toHaveBeenCalled();
  })
});
