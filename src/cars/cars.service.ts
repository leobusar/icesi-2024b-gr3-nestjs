import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BrandsService } from 'src/brands/brands.service';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car) private readonly carRepository: Repository<Car>,
    private readonly brandService: BrandsService,
  ) {}

  findAll() {
    //return this.cars;
  }

  findById(id: string) {
    // const car = this.cars.find((car) => id == car.id);
    // if (car == undefined) throw new NotFoundException();
    // return car;
  }

  delete(id: string) {
    // const car = this.findById(id);
    // this.cars = this.cars.filter((car) => id != car.id);
    // return car;
  }

  async create(createCarDto: CreateCarDto) {
    const brand = await this.brandService.findOne(createCarDto.brand);
    const newCar = Object.assign({ ...createCarDto, brand });
    return this.carRepository.save(newCar);
  }

  update(id: string, car: UpdateCarDto) {
    // const carUpdate = this.findById(id);
    // Object.assign(carUpdate, car);
    // return carUpdate;
  }
}
