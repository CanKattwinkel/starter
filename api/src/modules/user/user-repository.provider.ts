import {Connection} from 'typeorm';
import {UserEntity} from './user.entity';
import {DbConnectionToken} from '../database/database.provider';
import {Repository} from 'typeorm/repository/Repository';


/**
 * Inject this class in order to access the user repository:
 *
 *    constructor(private UserRepo: UserRepo) {
 *    }
 *
 *  And don't forget to import the user module to the corresponding module.
 * */
export abstract class UserRepo extends Repository<UserEntity> {
}

export const userRepoProvider = {
  provide: UserRepo,
  useFactory: (connection: Connection) => connection.getRepository(UserEntity),
  inject: [DbConnectionToken],
};

