// src/health/health.controller.ts
import { Controller, Get } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Controller()
export class HealthController {
  constructor(private readonly ds: DataSource) {}

  @Get('health')
  liveness() {
    return { status: 'ok' }; // processo de pé
  }

  @Get('health/db')
  async db() {
    try {
      if (this.ds.isInitialized) {
        await this.ds.query('SELECT 1');
      }
      return { status: 'ok' };
    } catch {
      return { status: 'offline' };
    }
  }
}