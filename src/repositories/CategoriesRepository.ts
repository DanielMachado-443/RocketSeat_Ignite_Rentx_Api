import { Category } from "../model/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "./ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
    private categories: Category[];    
    
    constructor(){
        this.categories = []; //<< It initializes the variable
    }

    create({ description, name }: ICreateCategoryDTO): void {
        const category = new Category();        

        Object.assign(category, { //<< This method inserts the attributes IN the category object
            name,
            description,
            created_at: new Date(),
        });        
    
        this.categories.push(category);         
    }

    list(): Category[] { // This is almost a get
        return this.categories;
    }

    findByName(name: string): Category { 
        const category = this.categories.find((category) => category.name === name);
        return category;
    }
}

export { CategoriesRepository };