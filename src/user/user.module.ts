import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AccountModule } from '../account/account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Module({
  providers: [UserService, UserRepository],
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User]), AccountModule],
  exports: [UserService],
})
export class UserModule {}
