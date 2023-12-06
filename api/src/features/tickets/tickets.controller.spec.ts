import { Test, TestingModule } from '@nestjs/testing';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { getModelToken } from '@nestjs/mongoose';
import { Ticket } from './entities/ticket.entity';
import { User } from '../users/entities/user.entity';
import { Category } from '../category/entities/category.entity';
import { UsersService } from '../users/users.service';
import { CategoryService } from '../category/category.service';

describe('TicketsService', () => {
  let ticketService: TicketsService;
  let ticketController: TicketsController;

  const mockTicket: any = {
    _id: '6563de81ad3515d39e2370ac',
    title: 'TODO',
    description: 'Updating Ticket',
    assignee: 'rramirewaz@mailinator.com',
    category: 'Math',
    duedate: '2023-11-27T06:11:22.000+00:00',
  };

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
      controllers: [TicketsController],
      providers: [
        TicketsService,
        {
          provide: getModelToken(Ticket.name),
          useValue: mockService,
        },
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: mockService,
        },
        CategoryService,
        {
          provide: getModelToken(Category.name),
          useValue: mockService,
        },
      ],
    }).compile();

    ticketService = module.get<TicketsService>(TicketsService);
    ticketController = module.get<TicketsController>(TicketsController);
  }); //End of TestingModule

  describe('create', () => {
    it('Should create a new Ticket', async () => {
      jest.spyOn(ticketService, 'create').mockResolvedValue(mockTicket);
      const result = await ticketService.create(
        mockUser._id,
        mockUser.req,
        mockTicket,
      );
      expect(
        await ticketController.create(mockUser._id, mockUser.req, mockTicket),
      ).toEqual(result);
    });
  }); //End of create

  describe('findAll', () => {
    it('Should get all the tickets from an User by User Id', async () => {
      jest.spyOn(ticketService, 'findAll').mockResolvedValue(mockTicket);
      const result = await ticketService.findAll(mockUser._id, mockCategory);
      expect(
        await ticketController.findAll(mockUser._id, mockCategory),
      ).toEqual(result);
    });
  }); //End of findAll

  describe('findByCategory', () => {
    it('Should get all the Tickets associated with a Category', async () => {
      jest.spyOn(ticketService, 'findByCategory').mockResolvedValue(mockTicket);
      const result = await ticketService.findByCategory(
        mockUser._id,
        mockCategory.name,
      );
      expect(
        await ticketController.findByCategory(mockUser._id, mockCategory.name),
      ).toEqual(result);
    });
  }); //End of findByCategory

  describe('findOne', () => {
    it('Should find a Ticket by Ticket Id', async () => {
      jest.spyOn(ticketService, 'findOne').mockResolvedValue(mockTicket);
      const result = await ticketService.findOne(mockTicket._id);
      expect(await ticketController.findOne(mockTicket._id)).toEqual(result);
    });
  }); //End of findOne

  describe('update', () => {
    it('Should update a Ticket give the ticket Id', async () => {
      mockTicket.description = 'test description';
      jest.spyOn(ticketService, 'update').mockResolvedValue(mockTicket);
      const result = await ticketService.update(
        mockTicket._id,
        mockUser.refreshToken,
        mockTicket,
      );
      expect(
        await ticketController.update(
          mockTicket._id,
          mockUser.refreshToken,
          mockTicket,
        ),
      ).toEqual(result);
    });
  }); //End of update

  describe('permanentRemove', () => {
    it('Should delete a ticket permanently', async () => {
      jest
        .spyOn(ticketService, 'permanentRemove')
        .mockResolvedValue(mockTicket);
      await ticketService.permanentRemove(mockTicket._id);
      expect(ticketService.permanentRemove).toHaveBeenCalledWith(
        mockTicket._id,
      );
    });
  }); //End of delete

  describe('softRemove', () => {
    it('Should delete a ticket by soft delete', async () => {
      jest.spyOn(ticketService, 'softRemove').mockResolvedValue(mockTicket);
      await ticketService.softRemove(mockTicket._id, mockUser.refreshToken);
      expect(ticketService.softRemove).toHaveBeenCalledWith(
        mockTicket._id,
        mockUser.refreshToken,
      );
    });
  }); //End of delete
});
