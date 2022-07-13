import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all available cars", async () => {
    const car1 = await carsRepositoryInMemory.create({ // The 'create' also returns a car object
      name: "Car1",
      description: "Car description",
      daily_rate: 110.0,
      license_plate: "DEF-1234",
      fine_amount: 40,
      brand: "Ferrari",
      category_id: "category_id",
    });

    const cars1 = await listAvailableCarsUseCase.execute({});

    expect(cars1).toEqual([car1]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car2 = await carsRepositoryInMemory.create({ // The 'create' also returns a car object
      name: "Car2",
      description: "Car description",
      daily_rate: 110.0,
      license_plate: "DEF-1234",
      fine_amount: 40,
      brand: "Porsche",
      category_id: "category_id",
    });

    const cars2 = await listAvailableCarsUseCase.execute({ brand: "Porsche" });

    expect(cars2).toEqual([car2]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "Car description",
      daily_rate: 110.0,
      license_plate: "DEF-1235",
      fine_amount: 40,
      brand: "Car_brand_test",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car3",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car3 = await carsRepositoryInMemory.create({ // The 'create' also returns a car object
      name: "Car3",
      description: "Car description",
      daily_rate: 110.0,
      license_plate: "DEF-1234",
      fine_amount: 40,
      brand: "Lamborguini",
      category_id: "12345",
    });

    const cars3 = await listAvailableCarsUseCase.execute({ category_id: "12345" });

    expect(cars3).toEqual([car3]);
  });
});