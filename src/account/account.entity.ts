import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Invoice } from '../invoice/invoice.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  currency: string;

  @Column()
  amount: number;

  @Column({ unique: true })
  accountNumber: string;

  @ManyToOne(() => User, (user) => user.accounts, { onDelete: 'SET NULL' })
  user: User;

  @OneToMany(() => Invoice, (invoice) => invoice.account)
  invoices?: Invoice[];
}
