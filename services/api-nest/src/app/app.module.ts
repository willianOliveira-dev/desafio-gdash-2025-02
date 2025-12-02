import { Module, OnModuleInit } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { validateEnv, Env } from 'src/env.validation'
import { AuthModule } from 'src/modules/auth/auth.module'
import { UsersModule } from 'src/modules/users/users.module'
import { WeathersModule } from 'src/modules/weathers/weathers.module'
import { UserSeeder } from './seed/user.seeder'
import { InsightsSeeder } from './seed/insights.seeder'
import { AvatarsModule } from 'src/modules/avatars/avatars.module'
import { ExploreModule } from 'src/modules/explore/explore.module'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<Env>) => ({
        uri: config.get('MONGO_URI', { infer: true }),
      }),
    }),
    AuthModule,
    UsersModule,
    AvatarsModule,
    WeathersModule,
    ExploreModule,
  ],
  controllers: [],
  providers: [UserSeeder, InsightsSeeder],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly userSeeder: UserSeeder,
    private readonly insightsSeeder: InsightsSeeder,
  ) {}

  async onModuleInit() {
    await this.userSeeder.seed()
    await this.insightsSeeder.seed()
  }
}
