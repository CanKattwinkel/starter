import {Connection} from 'typeorm';
import {ParkSpotEntity} from './parkspot.entity';
import {DbConnectionToken} from '../database/database.provider';
import {Repository} from 'typeorm/repository/Repository';


/**
 * Inject this class in order to access the parkspot repository:
 *
 *    constructor(private ParkspotRepo: ParkspotRepo) {
 *    }
 *
 *  And don't forget to import the parkspot module to the corresponding module.
 * */
export abstract class ParkspotRepo extends Repository<ParkSpotEntity> {
}

export const parkspotRepoProvider = {
  provide: ParkspotRepo,
  useFactory: (connection: Connection) => connection.getRepository(ParkSpotEntity),
  inject: [DbConnectionToken],
};

