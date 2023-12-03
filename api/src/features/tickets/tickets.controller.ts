import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { AccessTokenGuard, RefreshTokenGuard } from '@features/auth/guards';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @UseGuards(AccessTokenGuard)
  @Post(':id')
  async create(
    @Param('id') id: any,
    @Req() req: Request,
    @Body() createTicketDto: CreateTicketDto,
  ) {
    return await this.ticketsService.create(id, req, createTicketDto);
  } //End of create

  @Get('all/:id')
  findAll(@Param('id') id: any, @Body() body) {
    return this.ticketsService.findAll(id, body);
  } //End of findAll

  @Get('byCategory/:id')
  findByCategory(@Param('id') id: any, @Body() body) {
    return this.ticketsService.findByCategory(id, body);
  }

  @Get(':id')
  findOne(@Param('id') id: any) {
    return this.ticketsService.findOne(id);
  } //End of findOne

  @Patch(':id')
  update(
    @Param('id') id: any,
    @Req() req: Request,
    @Body() updateTicketDto: UpdateTicketDto,
  ) {
    return this.ticketsService.update(id, req, updateTicketDto);
  } //End of update

  @Delete('permanent/:id')
  permanentRemove(@Param('id') id: any) {
    return this.ticketsService.permanentRemove(id);
  } //End of Delete

  @UseGuards(RefreshTokenGuard)
  @Delete(':id')
  softRemove(@Param('id') id: any, @Req() req: Request) {
    return this.ticketsService.softRemove(id, req);
  } //End of Delete
} //End of class TicketsController
