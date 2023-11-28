import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { AccessTokenGuard } from '@features/auth/guards'

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @UseGuards(AccessTokenGuard)
  @Post(':id')
  async create(@Param("id") id: any, @Req() req: Request, @Body() createTicketDto: CreateTicketDto) {
    return await this.ticketsService.create(id, req, createTicketDto);
  }//End of create


  @Get()
  findAll() {
    return this.ticketsService.findAll();
  }//End of findAll


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(+id);
  }//End of findOne


  @Patch(':id')
  update(@Param('id') id: any, @Req() req: Request, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.update(id, req, updateTicketDto);
  }//End of update


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(+id);
  }//End of Delete

  
}//End of class TicketsController
