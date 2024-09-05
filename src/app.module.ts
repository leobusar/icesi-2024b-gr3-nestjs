import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsModule } from './cars/cars.module';
import { BrandsModule } from './brands/brands.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD, 
      port: +process.env.DB_PORT,
      autoLoadEntities: true,
      synchronize: true, // solo para desarrollo
    }),

    CarsModule, 
    BrandsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
