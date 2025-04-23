import { z } from 'zod'
import config from './type-orm.config'
import { DataSource } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import BookEntity from './book/book.entity'
import migrations from './migrations'

const ConfigSchema = z.object({
  host: z.string().min(1),
  port: z.coerce.number().int().positive(),
  user: z.string().min(1),
  password: z.string().min(1),
  database: z.string().min(1),
  dev: z.enum(['true', 'false']),
  debug: z.enum(['true', 'false']),
})

const configParsed = ConfigSchema.parse(config)


export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configParsed.host,
  port: configParsed.port,
  username: configParsed.user,
  password: configParsed.password,
  database: configParsed.database,
  synchronize: configParsed.dev === 'true',
  logging: configParsed.debug === 'true',
  namingStrategy: new SnakeNamingStrategy(),
  entities: [BookEntity],
  migrations: migrations,
  migrationsRun: true
  // entities: ['src/infrastructure/adapters/type-orm/entities/*.ts'],
  // migrations: ['src/infrastructure/adapters/type-orm/migrations/*.ts'],
})


export const isInitialized = async (): Promise<boolean> => {
  if(AppDataSource.isInitialized) return Promise.resolve(true)

  return AppDataSource.initialize().then(() => Promise.resolve(true)).catch(() => Promise.resolve(false))
  
}

