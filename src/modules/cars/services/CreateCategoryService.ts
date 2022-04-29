import { ICategoriesRepository } from "../repositories/ICategoriesRepository";


interface IRequest{
    name: string;
    description: string;
}

class CreateCategoryService {

    constructor(private categoriesRepository: ICategoriesRepository) { //<< Pay atention to this private word which consists in a trick
    }                                                                  // ICategoriesRepository (interface) is USED IN the place of the a concrete class/type 

    execute({ description, name }: IRequest): void{        
        const categoryAlreadyExists = this.categoriesRepository.findByName(name);

        if(categoryAlreadyExists){
            throw new Error("Category already exists!")
        }
        
        this.categoriesRepository.create({ name, description }); // It creates the category!
    }
}



export { CreateCategoryService }