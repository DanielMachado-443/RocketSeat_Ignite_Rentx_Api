import { Category } from "../entities/Category";

interface ICreateCategoryDTO {
    name: string;
    description: string;    
}

interface ICategoriesRepository {
    findByName(name: string): Promise<Category>;
    list(): Promise<Category[]>; //<< This list method returns a Category[] array
    create({ name, description }: ICreateCategoryDTO): Promise<void>; // << It desestructure the interface 
}

export { ICategoriesRepository, ICreateCategoryDTO } ;