import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {ApiModelProperty} from '@nestjs/swagger';

@Entity()
export class ParkSpotEntity {

  @PrimaryGeneratedColumn()
  @ApiModelProperty()
  id: number;

  @Column()
  @ApiModelProperty()
  available: boolean;

  @Column()
  @ApiModelProperty()
  electricCharger: boolean;
}
