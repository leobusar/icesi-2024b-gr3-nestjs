import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {

    constructor(private readonly carsService: CarsService){}

    @Get()
    findAll() {
        return this.carsService.findAll();
    }

    @Post()
    create(): string {
        return "this action create a car";
    }

    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.carsService.findById(id);
    }    


}
