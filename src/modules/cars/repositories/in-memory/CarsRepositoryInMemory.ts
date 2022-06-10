import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    name,
    license_plate,
  }: ICreateCarDTO): Promise<Car> {

    const car = new Car();
    Object.assign(car, {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      name,
      license_plate,
    });
    this.cars.push(car);
    return car; // << Is this 'car' return strict necessary?
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string,
  ): Promise<Car[]> {

    let availableCars = this.cars.filter(car => car.available)

    if (!name && !brand && !category_id)
      return availableCars;

    return availableCars.filter(car => {
      if (name === car.name || brand === car.brand || category_id === car.category_id)
        return true;
    })

    // FINAL TEACHER SOLUTION BELOW
    //   let availableCars = this.cars.filter(car => car.available);

    //   if (!name && !brand && !category_id) return availableCars;

    //   availableCars = availableCars.filter(car => {
    //     if (car.name === name) return true;
    //     if (car.brand === brand) return true;
    //     if (car.category_id === category_id) return true;

    //     return false;
    //   });

    //   return availableCars;
    // }

    // return this.cars.filter(car => { // << Teacher WRONG way below!
    //   if (
    //     car.available === true ||
    //     brand && car.brand === brand ||
    //     category_id && car.category_id === category_id ||
    //     name && car.name === name
    //   ) {
    //     return car;
    //   }
    //   return null;    
    // });

    //Trying to make it right below, because the teacher has messed it up a little bit     
  }
}

export { CarsRepositoryInMemory }