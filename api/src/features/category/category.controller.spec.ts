import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { getModelToken } from '@nestjs/mongoose';
import { Category } from './entities/category.entity';

describe('CategoryService', () => {
  let categoryService: CategoryService;
  let categoryController: CategoryController;

  const mockCategory: any = {
    _id: '6563e3b19750b6eb3499728d',
    name: 'Math',
    description: 'Global',
    numberoftickets: 1,
  };

  const mockUser: any = {
    _id: '656we415ed187f1r71e60a83',
    name: 'Hilary',
    lastname: 'Duff',
    email: 'hduff2023@mailinator.com',
    password:
      '$argon2id$v=19$m=65536,t=3,p=4$HL1dYBria5ViVRJbRlLd5g$1WjzbfznU7bJwAhruw7KT5jspSsfhz9/KgKxwya6VZ8',
    gender: 'female',
    validatedAccount: false,
    birthdate: '1989-11-12T06:00:00.000+00:00',
    lastconnection: '2023-12-03T02:02:58.494+00:00',
    lastupdate: '2023-12-03T02:02:58.494+00:00',
    accountType: 'admin',
    refreshToken:
      '$argon2id$v=19$m=65536,t=3,p=4$pTnZdSxwcRdk6eANrE/cjw$LmlIUBR8Q0V4b6gmUdFWoRxgDYmEWdrEUfTpACS/8SI',
  };

  const mockService = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        CategoryService,
        {
          provide: getModelToken(Category.name),
          useValue: mockService,
        },
      ],
    }).compile();

    categoryService = module.get<CategoryService>(CategoryService);
    categoryController = module.get<CategoryController>(CategoryController);
  });

  describe('create', () => {
    it('Should create a new Category', async () => {
      jest.spyOn(categoryService, 'create').mockResolvedValue(mockCategory);
      const result = await categoryService.create(
        mockUser.refreshToken,
        mockCategory,
      );
      expect(
        await categoryController.create(mockUser.refreshToken, mockCategory),
      ).toEqual(result);
    });
  }); //End of create

  describe('findAll', () => {
    it('Should create a new Category', async () => {
      jest.spyOn(categoryService, 'findAll').mockResolvedValue(mockCategory);
      const result = await categoryService.findAll(mockCategory);
      expect(await categoryController.findAll(mockCategory)).toEqual(result);
    });
  }); //End of findAll

  describe('findByTitle', () => {
    it('Should create a new Category', async () => {
      jest
        .spyOn(categoryService, 'findByTitle')
        .mockResolvedValue(mockCategory);
      const result = await categoryService.findByTitle(mockCategory.name);
      expect(await categoryController.findByTitle(mockCategory.name)).toEqual(
        result,
      );
    });
  }); //End of findByTitle

  describe('findOne', () => {
    it('Should create a new Category', async () => {
      jest.spyOn(categoryService, 'findOne').mockResolvedValue(mockCategory);
      const result = await categoryService.findOne(mockCategory._id);
      expect(await categoryController.findOne(mockCategory._id)).toEqual(
        result,
      );
    });
  }); //End of findOne

  describe('update', () => {
    it('Should create a new Category', async () => {
      mockCategory.description = 'testing description';
      jest.spyOn(categoryService, 'update').mockResolvedValue(mockCategory);
      const result = await categoryService.update(
        mockCategory._id,
        mockUser.refreshToken,
        mockCategory,
      );
      expect(
        await categoryController.update(
          mockCategory._id,
          mockUser.refreshToken,
          mockCategory,
        ),
      ).toEqual(result);
    });
  }); //End of update

  describe('remove', () => {
    it('Should create a new Category', async () => {
      jest.spyOn(categoryService, 'remove').mockResolvedValue(mockCategory);
      await categoryService.remove(mockUser.refreshToken, mockCategory._id);
      expect(categoryService.remove).toHaveBeenCalledWith(
        mockUser.refreshToken,
        mockCategory._id,
      );
    });
  }); //End of remove
});
