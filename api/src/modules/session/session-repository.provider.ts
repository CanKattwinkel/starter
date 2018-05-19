import {Connection} from 'typeorm';
import {DbConnectionToken} from '../database/database.provider';
import {Repository} from 'typeorm/repository/Repository';
import {SessionEntity} from './session.entity';


/**
 * Inject this class in order to access the session repository:
 *
 *    constructor(private SessionRepo: SessionRepo) {
 *    }
 *
 *  And don't forget to import the session module to the corresponding module.
 * */
export abstract class SessionRepo extends Repository<SessionEntity> {
}

export const sessionRepoProvider = {
  provide: SessionRepo,
  useFactory: (connection: Connection) => connection.getRepository(SessionEntity),
  inject: [DbConnectionToken],
};

