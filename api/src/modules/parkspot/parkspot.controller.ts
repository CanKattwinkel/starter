import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post, ValidationPipe} from '@nestjs/common';
import {ParkspotService} from './parkspot.service';
import {ParkSpotDto} from './parkspot.dto';
import {ApiResponse, ApiUseTags} from '@nestjs/swagger';
import {ParkSpotEntity} from './parkspot.entity';

@ApiUseTags('parkspot')
@Controller('parkspot')
export class ParkspotController {
  constructor(private readonly parkSpotService: ParkspotService) {
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns a list of all Parkspots',
    type: ParkSpotEntity,
    isArray: true,
  })
  async getAll(): Promise<ParkSpotEntity[]> {
    return await this.parkSpotService.find();
  }

  @Get('/:id')
  @ApiResponse({status: HttpStatus.OK, description: 'Returns a single ParkingSpot', type: ParkSpotEntity})
  async get(@Param('id') id: number): Promise<ParkSpotEntity> {
    return await this.parkSpotService.findOne(id);
  }


  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The record has been successfully created.',
    type: ParkSpotEntity,
  })
  @ApiResponse({status: HttpStatus.CONFLICT, description: 'Forbidden.'})
  @Post()
  async create(@Body(new ValidationPipe()) parkSpotDto: ParkSpotDto): Promise<ParkSpotEntity> {
    return await this.parkSpotService.create(parkSpotDto);
  }
}
