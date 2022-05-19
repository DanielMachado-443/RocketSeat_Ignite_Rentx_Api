import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCategoriesUseCase} from  './ListCategoriesUseCase';

class ListCategoriesController{
    async handle(request: Request, response: Response): Promise<Response>{
        const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);

        const all = await listCategoriesUseCase.execute(); // << It will call the list method 

        return response.json(all);
    }    
}

export { ListCategoriesController };