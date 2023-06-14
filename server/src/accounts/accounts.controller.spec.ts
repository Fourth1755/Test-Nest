import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';

describe('AccountsController', () => {
  let controller: AccountsController;

  const mockAccountService = {
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
      controllers: [AccountsController],
      providers: [AccountsService],
    }).overrideProvider(AccountsService).useValue(mockAccountService).compile();

    controller = module.get<AccountsController>(AccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should add anime and return account',()=>{
    expect(controller.addAnime)
  })
});
