import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { CreateCategoryDto } from '../category/dto/create-category.dto'; 
import { CategoryService } from '../category/category.service'; 
import { InjectModel } from '@nestjs/mongoose';
import { Ticket, TicketDocument } from './entities/ticket.entity';
import { UsersService } from '@features/users/users.service';
import { ConfigService } from '@nestjs/config';
import { CategoryModule } from '../category/category.module';


@Injectable()
export class TicketsService {

  constructor(@InjectModel(Ticket.name) private ticketModel: Model <TicketDocument>,     
  private userService: UsersService,
  private configService: ConfigService,
  private categoryService: CategoryService){

  }//End of constructor


  //id => user id
  async create(id: any, req: any, createTicketDto: CreateTicketDto): Promise<TicketDocument> {
    if(req == null) return null;
    
    const loggedUser = await this.userService.findOne({_id: id});
    //console.log(loggedUser.email);
    const email = loggedUser.email;
    const newTicket = {
      ...createTicketDto, 
      assignee: email
    }
    
    const createdTicket = await new this.ticketModel(newTicket);
    return createdTicket.save();
  }//End of create


  findAll() {
    const allTickets = this.ticketModel.find().exec();
    return allTickets;
  }//End of findAll


  findOne(id: any) {
    const findTicket = this.ticketModel.findById(id).exec();
    return findTicket
  }//End of findOne


  //id => ticket id
  async update(id: any, req: any, updateTicketDto: UpdateTicketDto){
    const newAssignee = await this.userService.findByEmail(updateTicketDto.assignee);
    if(!newAssignee){ 
      throw new BadRequestException("User does not exist. Tickets can only be assigned to existent users"); 
    }

    const newCategory = await this.categoryService.findByTitle(updateTicketDto.category);
    if(!newCategory){ 
      throw new BadRequestException("Category Does not exist. Please create Category First"); 
    }

    const updatedTicket = {
      ...updateTicketDto,
      category: newCategory.name,
      assignee: newAssignee.email
    }

    return await this.ticketModel.updateOne({_id: id}, updatedTicket).exec()   

  }//End of update


  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }//End of remove


}//End of class TicketService
