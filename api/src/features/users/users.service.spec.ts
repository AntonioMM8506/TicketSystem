import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { EventEmitter } from 'stream';
import { BadRequestException } from '@nestjs/common';

describe('UsersService', () => {
  let usersService: UsersService;

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

  const mockUserService = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserService,
        },
        EventEmitter,
        {
          provide: getModelToken(User.name),
          useValue: mockUserService,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  describe('create', () => {
    it('Should create a new user given the user Schema', async () => {
      jest.spyOn(usersService, 'create').mockResolvedValue(mockUser);
      const result = await usersService.create(mockUser);
      expect(result).toEqual(mockUser);
    });

    it('Should not create user if the user already exists', async () => {
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(mockUser);
      await expect(usersService.create(mockUser)).rejects.toThrow(
        BadRequestException,
      );
    });
  }); //End of create

  describe('findOne', () => {
    it('Should find and return user by ID', async () => {
      jest.spyOn(usersService, 'findOne').mockResolvedValue(mockUser);
      const result = await usersService.findOne(mockUser._id);
      expect(usersService.findOne).toHaveBeenCalledWith(mockUser._id);
      expect(result).toBe(mockUser);
    });
  }); //End of findOne test

  describe('findAll', () => {
    it('Should find and return all available users', async () => {
      jest.spyOn(usersService, 'findAll').mockResolvedValue(mockUser);
      const result = await usersService.findAll();
      expect(result).toEqual(mockUser);
    });
  }); //End of findAll

  describe('findByEmail', () => {
    it('Should find and return user by Email', async () => {
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(mockUser);
      const result = await usersService.findByEmail(mockUser.email);
      expect(usersService.findByEmail).toHaveBeenCalledWith(mockUser.email);
      expect(result).toBe(mockUser);
    });
  }); //End of findAll

  describe('update', () => {
    it('Should find and update user by Id', async () => {
      mockUser.email = 'hduff2023@yopmail.com';
      jest.spyOn(usersService, 'update').mockResolvedValue(mockUser);
      const result = await usersService.update(mockUser._id, mockUser);
      expect(usersService.update).toHaveBeenCalledWith(mockUser._id, mockUser);
      expect(result).toEqual(mockUser);
    });
  }); //End of update

  describe('remove', () => {
    it('Should find and remove user by Id', async () => {
      jest.spyOn(usersService, 'remove').mockResolvedValue(mockUser);
      await usersService.remove(mockUser._id);
      expect(usersService.remove).toHaveBeenCalledWith(mockUser._id);
    });
  }); //End of remove
}); //End of Suite
