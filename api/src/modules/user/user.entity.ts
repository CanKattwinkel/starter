import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {UserLevel} from './user-level.enum';
import {hashIt} from '../../utils/encrypt';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    mail: string;

    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updatedAt: Date;

    @Column({select: false, length: 60})
    password?: string;

    @Column({type: 'integer', default: UserLevel.PrivateUser})
    userLevel: UserLevel;

    // I'm not sure yet whether this logic would not be
    // better kept in the user service. In any case,
    // the trigger is not called when a pure object
    // is inserted. Instead, an instance must be created
    // manually and then saved.
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            this.password = await hashIt(this.password);
        }
    }

}
