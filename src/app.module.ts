import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { WikiModule } from './wiki/wiki.module';

@Module({
  imports: [AuthModule, UserModule, WikiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
