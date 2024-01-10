import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Account } from '../account/account.entity';
import { BankCard } from '../card-payment/bankCard.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => Account, (account) => account.user, { cascade: true })
  accounts?: Account[];

  @OneToMany(() => BankCard, (bankCard) => bankCard.user, { cascade: true })
  bankCards?: Account[];
}
