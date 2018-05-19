import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {UserEntity} from '../user/user.entity';

/**
 * What sessions? Arent we doin' JWT?
 *
 * Well yes but for proper token renewal we also give one 10 year refresh token to each session.
 * This enables us to use really short JWT lifetimes and having users being logged in for "ever".
 *
 * */

@Entity()
export class SessionEntity {

  @PrimaryGeneratedColumn()
  id: number;

  /// this is the refresh token as far as i remember, maybe check.
  @Column({unique: true, select: false, nullable: true})
  token: string;

  @Column({type: 'timestamp'})
  lastUsed: Date;

  @Column()
  lastBrowser: string;

  @Column()
  lastOs: string;

  @Column({type: 'cidr'})
  lastIp: string;

  @ManyToOne(type => UserEntity, user => user.sessions, {eager: true})
  user: UserEntity;
}
