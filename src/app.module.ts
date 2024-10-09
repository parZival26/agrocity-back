import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { WikiModule } from './wiki/wiki.module';
import { PlantModule } from './plant/plant.module';
import { MissionModule } from './mission/mission.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [AuthModule, UserModule, WikiModule, PlantModule, MissionModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
