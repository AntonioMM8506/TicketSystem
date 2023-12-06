import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket, TicketDocument } from './entities/ticket.entity';
import { CategoryService } from '@features/category/category.service';
import { InjectModel } from '@nestjs/mongoose';
import { UsersService } from '@features/users/users.service';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>,
    private userService: UsersService,
    private categoryService: CategoryService,
  ) {} //End of constructor

  //id => user id
  async create(
    id: any,
    req: any,
    createTicketDto: CreateTicketDto,
  ): Promise<TicketDocument> {
    const newCategory = await this.categoryService.findByTitle(
      createTicketDto.category,
    );
    if (!newCategory) {
      throw new BadRequestException(
        'Category Does not exist. Please select an existing Category',
      );
    }

    const loggedUser = await this.userService.findOne({ _id: id });
    const email = loggedUser.email;
    const newTicket = {
      ...createTicketDto,
      category: newCategory.name,
      assignee: email,
    };

    //Updates counter of Category by 1
    await this.categoryService.increaseCounter(createTicketDto.category);
    const createdTicket = await new this.ticketModel(newTicket).save();
    return createdTicket;
  } //End of create

  //id => user id; find all by user id
  async findAll(id: any, body: any): Promise<any> {
    const user = await this.userService.findOne({ _id: id });

    //if page and limit parameters are not indicated in the body, then all tickets
    //related to the user are retrieved with no exception.
    if (!body.limit || !body.page) {
      const allTickets = await this.ticketModel
        .find({ assignee: user.email })
        .sort([['duedate', -1]])
        .exec();
      return allTickets;
    } else {
      const elements = (
        await this.ticketModel.find({ assignee: user.email }).exec()
      ).length;
      const limit: number = body.limit;
      const page: number = (body.page - 1) * limit;

      if (page > elements) {
        throw new BadRequestException(
          'There is no elements to show in this page',
        );
      }

      const allTickets = await this.ticketModel
        .aggregate([
          { $match: { assignee: user.email } },
          { $sort: { duedate: -1 } },
          { $skip: page },
          { $limit: body.limit },
        ])
        .exec();

      return allTickets;
    }
  } //End of findAll

  async findByCategory(id: any, body: any): Promise<any> {
    const validateCategory = await this.categoryService.findByTitle(
      body.category,
    );
    if (!validateCategory) {
      throw new BadRequestException('Not existent Category');
    }

    const user = await this.userService.findOne({ _id: id });

    if (!body.limit || !body.page) {
      const allTickets = await this.ticketModel
        .find({ assignee: user.email, category: body.category })
        .sort([['duedate', -1]])
        .exec();

      return allTickets;
    } else {
      const elements = (
        await this.ticketModel.find({ category: body.category }).exec()
      ).length;
      const limit: number = body.limit;
      const page: number = (body.page - 1) * limit;
      if (page > elements) {
        throw new BadRequestException(
          'There is no elements to show in this page',
        );
      }

      const allTickets = await this.ticketModel
        .aggregate([
          { $match: { assignee: user.email, category: body.category } },
          { $sort: { duedate: -1 } },
          { $skip: page },
          { $limit: body.limit },
        ])
        .exec();

      return allTickets;
    }
  } //End of findByCategory

  async findOne(id: any) {
    const findTicket = await this.ticketModel.findById(id).exec();
    return findTicket;
  } //End of findOne

  //id ticket
  async update(id: any, req: any, updateTicketDto: UpdateTicketDto) {
    const newAssignee = await this.userService.findByEmail(
      updateTicketDto.assignee,
    );
    if (!newAssignee) {
      throw new BadRequestException(
        'User does not exist. Tickets can only be assigned to existent users',
      );
    }

    const newCategory = await this.categoryService.findByTitle(
      updateTicketDto.category,
    );
    if (!newCategory) {
      throw new BadRequestException(
        'Category Does not exist. Please create Category First',
      );
    }

    const updatedTicket = {
      ...updateTicketDto,
      category: newCategory.name,
      assignee: newAssignee.email,
    };

    return await this.ticketModel.updateOne({ _id: id }, updatedTicket).exec();
  } //End of update

  //Removes permanently a Ticket.
  async permanentRemove(id: any) {
    return await this.ticketModel.findById(id).deleteOne().exec();
  } //End of remove

  async softRemove(id: any, req: any) {
    const userId = req.user['email'];
    if (!userId) {
      throw new ForbiddenException('User not logged in');
    }

    const getTicket = await this.ticketModel.findById(id).exec();
    if (!getTicket) {
      throw new BadRequestException('No valid ticket to remove');
    }

    if (getTicket.assignee != userId) {
      throw new ForbiddenException(
        'Users cannot delete Tickets that are not assign to themselves',
      );
    }

    //Decreasing the counter of tickets from the Category collection
    const ticketCategory = await this.categoryService.findByTitle(
      getTicket.category,
    );
    await this.categoryService.decreaseCounter(ticketCategory.name);

    //Soft Delete, only removes the reference to the ticket, however the ticket it is not
    //deteleted/removed permanently.
    return await this.ticketModel
      .updateOne({ _id: id }, { assignee: '' })
      .exec();
  } //End of softRemove
} //End of class TicketService
