import { Category } from "../model/Category";

interface ICreateCategoryDTO {
    name: string;
    description: string;    
}

interface ICategoriesRepository {
    findByName(name: string): Category;
    list(): Category[]; //<< This list method returns a Category[] array
    create({ name, description }: ICreateCategoryDTO): void; // << It desestructure the interface 
}

export { ICategoriesRepository, ICreateCategoryDTO } ;