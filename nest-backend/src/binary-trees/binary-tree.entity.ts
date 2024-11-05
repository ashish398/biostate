import { User } from '../users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class BinaryTree {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-array')
  input: (number | null)[];

  @Column({ nullable: true })
  maxLeafToNodeSum: number;

  @Column('simple-array', { nullable: true })
  maxLeafToNodePath: any[];

  @Column({ nullable: true })
  maxAnyNodeSum: number;

  @Column('simple-array', { nullable: true })
  maxAnyNodePath: any[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.substrings)
  user: User;
}
