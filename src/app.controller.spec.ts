import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return the MVMNT intro page', () => {
      const page = appController.getMvmntPage();

      expect(page).toContain('<title>MVMNT | Move with Purpose</title>');
      expect(page).toContain('<h1>MVMNT</h1>');
      expect(page).toContain('https://mvmnts.com');
    });
  });
});
