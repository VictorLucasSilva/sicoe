import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthModule } from './health/health.module';
import { User } from './users/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        type: 'postgres',
        host: cfg.get('DB_HOST', 'localhost'),
        port: Number(cfg.get('DB_PORT', 5432)),
        username: cfg.get('DB_USER', 'sicoe'),
        password: cfg.get('DB_PASS', 'sicoe'),
        database: cfg.get('DB_NAME', 'sicoe'),
        entities: [User],
        synchronize: false,
        migrationsRun: false
      }),
    }),
    TypeOrmModule.forFeature([User]),
    HealthModule,
  ],
})
export class AppModule {}
