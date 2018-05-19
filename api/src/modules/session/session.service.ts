import {Component} from '@nestjs/common';
import {SessionRepo} from './session-repository.provider';
import {Request} from 'express';
import * as browser from 'browser-detect';
import {SessionEntity} from './session.entity';
import {UserEntity} from '../user/user.entity';
import * as jwt from 'jsonwebtoken';
import {addSeconds} from 'date-fns';
import {PrkConfig} from '../config/config.model';

@Component()
export class SessionService {

  constructor(private sessionRepo: SessionRepo, private config: PrkConfig) {
  }

  async byId(id: number): Promise<SessionEntity> {
    const session = await this.sessionRepo.findOne({id});
    if (!session) {
      throw new Error(`Coulnd't find session with id ${id}`);
    }
    return session;
  }

  async create(req: Request, user: UserEntity): Promise<SessionEntity> {
    console.log('creating a session for user', user.id);
    const ip = req.ip; // possibile that this doesnt work with apache/ngnix proxy - then use req.ips[0]

    const result = browser(req.headers['user-agent'] as string);

    const instance: Partial<SessionEntity> = {
      lastIp: ip || '0.0.0.0',
      lastOs: result.os || 'unknown',
      lastBrowser: result.name || 'unknown',
      lastUsed: new Date(),
      user: user
    };

    const session = await this.sessionRepo.save(instance) as SessionEntity;
    session.token = this.createRefreshToken(session.id, user.id);
    return this.sessionRepo.save(session);

  }


  async get(user: UserEntity): Promise<SessionEntity[]> {
    return this.sessionRepo.find({user: user});
  }

  // todo remove session token on logout
  async remove(id: number): Promise<void> {
    await this.sessionRepo.deleteById(id);
    new TypeError();
  }

  async update(id: number, updateData: Partial<SessionEntity>) {
    await this.sessionRepo.update({id}, updateData);

  }

  private createRefreshToken(sessionId, userId): string {
    const expiresIn = 31536000; // ~ 1 year
    const expiresAt = addSeconds(new Date(), expiresIn);

    const payload: SessionTokenPayload = {sessionId, userId, expiresAt};
    return jwt.sign(payload, this.config.runtimeConfiguration.jwtSecret, {expiresIn});
  }
}


export interface SessionTokenPayload {
  sessionId: number;
  userId: number;
  expiresAt: Date;
}
