import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { ExploreService } from './services/explore.service'
import { ExploreController } from './controllers/explore.controller'

@Module({
  imports: [HttpModule],
  providers: [ExploreService],
  controllers: [ExploreController],
})
export class ExploreModule {}
