import { Request, Response } from "express";
import { ListCategoriesUseCase} from  './ListCategoriesUseCase';


class ListCategoriesController{
    constructor(private listCategoriesUseCase: ListCategoriesUseCase){} // It receives a specificationRepository object WHEN it is initialized

    handle(request: Request, response: Response): Response{
        const all = this.listCategoriesUseCase.execute(); // << It will call the list method 

        return response.json(all);
    }    
}

export { ListCategoriesController };