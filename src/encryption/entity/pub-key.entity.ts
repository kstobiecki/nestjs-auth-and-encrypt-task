import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from '../../user/user.entity';

@Entity()
export class PubKey {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @CreateDateColumn()
  @Exclude()
  created: Date;

  @Column()
  pubKey: string;

  @OneToOne(() => User, (user: User) => user.pubKey, { onDelete: 'CASCADE' })
  user: User;
}
