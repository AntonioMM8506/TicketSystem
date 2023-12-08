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
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @UseGuards(AccessTokenGuard)
  @Post(':id')
  @ApiOperation({ summary: 'Creates new Ticket' })
  @ApiResponse({
    status: 201,
    description:
      'Creates new ticket given user Id as a Parameter, the required fields adn the Body, and the authorization Token as a Request as an Authorization Header',
  })
  async create(
    @Param('id') id: any,
    @Req() req: Request,
    @Body() createTicketDto: CreateTicketDto,
  ) {
    return await this.ticketsService.create(id, req, createTicketDto);
  } //End of create

  @Get('all/:id')
  @ApiOperation({ summary: 'Get all tickets given User Id' })
  @ApiResponse({
    status: 200,
    description:
      'Get all tickets given User Id as a Parameter and the query fields as the Body. In the fields the user can ask for the number of elements to show, and the page to view, if none of these values are provided then the query will return all the available tickets sorted by duedate.',
  })
  findAll(@Param('id') id: any, @Body() body) {
    return this.ticketsService.findAll(id, body);
  } //End of findAll

  @Get('byCategory/:id')
  @ApiOperation({ summary: 'Create new User' })
  @ApiResponse({
    status: 200,
    description:
      'Get all Tickets given User Id as a Parameter and the query fields, including the Category name, as the Body. In the fields the user can ask for the number of elements to show and the page to view, if none of these values are provided then the query will return all available Tickets, according to the given Category, sorted by duedate',
  })
  findByCategory(@Param('id') id: any, @Body() body) {
    return this.ticketsService.findByCategory(id, body);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Ticket by Ticket Id' })
  @ApiResponse({
    status: 200,
    description: 'Get a certain Ticket given the Ticket Id',
  })
  findOne(@Param('id') id: any) {
    return this.ticketsService.findOne(id);
  } //End of findOne

  @Patch(':id')
  @ApiOperation({ summary: 'Updates a Ticket given Ticket Id' })
  @ApiResponse({
    status: 201,
    description:
      'Updates a Ticket given Ticket Id as a Parameter, the access token as a Request as an Authorization Header, and the updated fields as the Body.',
  })
  update(
    @Param('id') id: any,
    @Req() req: Request,
    @Body() updateTicketDto: UpdateTicketDto,
  ) {
    return this.ticketsService.update(id, req, updateTicketDto);
  } //End of update

  @Delete('permanent/:id')
  @ApiOperation({ summary: 'Deletes permanently a Ticket' })
  @ApiResponse({
    status: 201,
    description: 'Deletes permanently a Ticket given Ticket Id as a Parameter',
  })
  permanentRemove(@Param('id') id: any) {
    return this.ticketsService.permanentRemove(id);
  } //End of Delete

  @UseGuards(RefreshTokenGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Removes softly a Ticket' })
  @ApiResponse({
    status: 201,
    description:
      'Removes Softly a Ticket given Ticket Id as a Parameter and the access token as a Request as an Authorization Header',
  })
  softRemove(@Param('id') id: any, @Req() req: Request) {
    return this.ticketsService.softRemove(id, req);
  } //End of Delete
} //End of class TicketsController
