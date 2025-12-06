import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import { ConfigService } from '@nestjs/config'
import { Env } from './env.validation'
import { ValidationPipe } from '@nestjs/common'
import { HttpExceptionFilter } from './common/filters/http-execption.filter'
import { ResponseInterceptor } from './common/interceptors/response.interceptor'
import { join } from 'node:path'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import * as cookieParser from 'cookie-parser'

import type { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const config = app.get(ConfigService<Env>)
  const staticFilePath: string = join(__dirname, '..', 'public')
  const BASE_API = config.get('BASE_API') as string
  const BASE_URL = config.get('BASE_URL') as string
  const FRONTEND_URL = config.get('FRONTEND_URL') as string

  app.useStaticAssets(staticFilePath, { prefix: '/public/' })

  app.setGlobalPrefix(BASE_API)

  app.use(cookieParser.default())
  app.use(morgan('dev'))
  app.use(helmet())
  app.use(compression())

  app.enableCors({
    origin: FRONTEND_URL,
    credentials: true,
  })

  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new ResponseInterceptor())
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  )

  await app.listen(config.get('PORT') ?? 3000)

  console.log(
    `🔥 API rodando em ${BASE_URL}/${BASE_API}
         📘 Documentação em ${BASE_URL}/docs
        `,
  )
}
bootstrap()
