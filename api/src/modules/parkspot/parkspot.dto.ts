import {ParkSpotEntity} from './parkspot.entity';
import {IsBoolean, IsNumber} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export class ParkSpotDto implements Partial<ParkSpotEntity> {

  @IsNumber()
  @ApiModelProperty()
  id: number;

  @IsBoolean()
  @ApiModelProperty()
  available: boolean;

  @IsBoolean()
  @ApiModelProperty()
  electricCharger: boolean;
}
