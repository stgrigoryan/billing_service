import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class BankCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, unique: true })
  cardNumber: string;

  @Column()
  expiryDate: string;

  @Column()
  cardHolderName: string;

  @Column()
  cardHolderLastName: string;

  @Column()
  securityCode: number;

  @Column()
  amount: number;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  user: User;
}
