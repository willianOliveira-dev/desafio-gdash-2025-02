import { Module } from '@nestjs/common'
import { AvatarsController } from './controllers/avatars.controller'
import { AvatarsService } from './services/avatars.service'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [UsersModule],
  providers: [AvatarsService],
  controllers: [AvatarsController],
})
export class AvatarsModule {}
