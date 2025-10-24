import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthModule } from './health/health.module';
import { DocumentsModule } from './documents/documents.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        type: 'postgres',
        host: cfg.get('DB_HOST', 'db'),
        port: parseInt(cfg.get('DB_PORT', '5432'), 10),
        username: cfg.get('DB_USER', 'sicoe'),
        password: cfg.get('DB_PASS', 'sicoe'),
        database: cfg.get('DB_NAME', 'sicoe'),
        autoLoadEntities: true, // carrega as entidades dos módulos
        synchronize: false,     // usamos migrations
      }),
    }),
    HealthModule,
    DocumentsModule,           // <- importante
  ],
})
export class AppModule {}
