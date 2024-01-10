import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Account } from '../account/account.entity';

export enum StatusType {
  Issued = 'Issued',
  Paid = 'Paid',
}

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  currency: string;

  @Column()
  issueDate: Date;

  @Column()
  amount: number;

  @Column({ type: 'enum', enum: StatusType })
  status: StatusType;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  user: User;

  @ManyToOne(() => Account, { onDelete: 'SET NULL' })
  account: Account;
}
