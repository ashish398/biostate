import { User } from '../users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Substring {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  input: string;

  @Column()
  longestSubstringLength: number;

  @Column('simple-array')
  uniqueSubstrings: string[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.substrings)
  user: User;
}
