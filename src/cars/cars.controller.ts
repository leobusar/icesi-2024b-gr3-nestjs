import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';

@Controller('cars')
export class CarsController {

    constructor(private readonly carsService: CarsService){}

    @Get()
    findAll() {
        return this.carsService.findAll();
    }

    @Post()
    //@UsePipes(ValidationPipe)
    create(@Body() car:CreateCarDto): Car {
        
        return this.carsService.create(car);
    }

    @Get(':id')
    findById(@Param('id', ParseUUIDPipe) id: string) {
        return this.carsService.findById(id);
    }    

    @Delete(':id')
    delete(@Param('id', ParseUUIDPipe) id: string) {
        return this.carsService.delete(id);
    }      

}
