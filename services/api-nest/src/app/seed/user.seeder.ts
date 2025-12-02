import { Injectable } from '@nestjs/common'
import { UsersService } from 'src/modules/users/services/users.service'
import { ConfigService } from '@nestjs/config'
import { Env } from 'src/env.validation'

@Injectable()
export class UserSeeder {
  constructor(
    private readonly usersService: UsersService,
    private readonly config: ConfigService<Env>,
  ) {}

  async seed(): Promise<void> {
    const defaultEmail = this.config.get('ENSURE_DEFAULT_USER_EMAIL') as string
    const defaultEmailExists: boolean =
      await this.usersService.existingEmail(defaultEmail)

    if (defaultEmailExists) return

    const defaultUsername = this.config.get(
      'ENSURE_DEFAULT_USER_USERNAME',
    ) as string
    const defaultPassword = this.config.get(
      'ENSURE_DEFAULT_USER_PASSWORD',
    ) as string

    await this.usersService.create({
      username: defaultUsername,
      email: defaultEmail,
      password: defaultPassword,
      role: 'admin',
    })
  }
}
