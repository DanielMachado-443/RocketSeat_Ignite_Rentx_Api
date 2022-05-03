import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest{
    name: string;
    description: string;
}

class CreateSpecificationUseCase{
    constructor(private specificationsRepository: ISpecificationsRepository){} // It receives a specificationRepository object WHEN it is initialized

    execute({ name, description }: IRequest): void{
        const specificationAlreadyExists = this.specificationsRepository.findByName(name);

        if(specificationAlreadyExists){
            throw new Error("Specification already exists!")
        }

        this.specificationsRepository.create({ 
            name, 
            description, 
        });
    }    
}

export { CreateSpecificationUseCase };