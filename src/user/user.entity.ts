import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { PubKey } from '../encryption/entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @CreateDateColumn()
  @Exclude()
  created: Date;

  @UpdateDateColumn()
  @Exclude()
  updated: Date;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToOne(() => PubKey, (pubKey) => pubKey.user, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  pubKey: PubKey;
}
