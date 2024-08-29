import { Injectable } from '@nestjs/common';

@Injectable()
export class CarsService {
    public  cars = [
        {
            "brand": "Chevrolet",
            "model": "Captiva",
            "year": 2020
        },
        {
            "brand": "Renault",
            "model": "Sandero",
            "year": 2017
        }
    
    ]

    findAll(){
        return this.cars;
    }

    findById(id: number){
        return this.cars[id];
    }
}
