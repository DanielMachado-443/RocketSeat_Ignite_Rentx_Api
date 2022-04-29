import { Specification } from "../model/Specification";
import { ISpecificationsRepository, ICreateSpecificationDTO } from "./ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
    private specifications: Specification[];

    constructor(){
        this.specifications = []; //<< Initializes it empty
    }   

    create({ description, name }: ICreateSpecificationDTO): void {
        const specification = new Specification(); // << It will automatically create a uuid ID from Specification's class constructor

        Object.assign(specification, { 
            name, 
            description,
            created_at: new Date(),
        });

        this.specifications.push(specification); //<< These are two DIFFERENT 'specification' objects
    }
    
    findByName(name: string): Specification {
        const specification = this.specifications.find
        (specification => specification.name === name)
        ;
        return specification;
    }

    list(): Specification[] { // This is almost a get
        return this.specifications;
    }
}

export { SpecificationsRepository };