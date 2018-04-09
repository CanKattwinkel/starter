import {Component, HttpException, HttpStatus} from '@nestjs/common';
import {ParkspotRepo} from './parkspot-repository.provider';
import {ParkSpotEntity} from './parkspot.entity';

@Component()
export class ParkspotService {


  constructor(private parkspotRepo: ParkspotRepo) {
  }

  async find(): Promise<ParkSpotEntity[]> {
    return this.parkspotRepo.find();
  }

  async findOne(id: number): Promise<ParkSpotEntity> {
    return this.parkspotRepo.findOneById(id);
  }

  async create(parkSpot: ParkSpotEntity): Promise<ParkSpotEntity> {
    try {
      await this.parkspotRepo.insert(parkSpot);
    } catch (e) {
      throw new HttpException(`ParkSpot with id '${parkSpot.id}' already exists`, HttpStatus.CONFLICT);
    }
    return this.parkspotRepo.findOneById(parkSpot.id);
  }
}
