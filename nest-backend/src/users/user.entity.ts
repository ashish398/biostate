import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Substring } from '../substrings/substring.entity';
import { BinaryTree } from '../binary-trees/binary-tree.entity';

export enum UserRole {
  MEMBER = 'member',
  MANAGER = 'manager',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.MEMBER,
  })
  role: UserRole;

  @OneToMany(() => Substring, (substring) => substring.user)
  substrings: Substring[];

  @OneToMany(() => BinaryTree, (binaryTree) => binaryTree.user)
  binaryTrees: BinaryTree[];
}
