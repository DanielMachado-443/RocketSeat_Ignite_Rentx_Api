import { Router } from 'express';
import { CreateSpecificationService } from '../modules/cars/services/CreateSpecificationService';
import { SpecificationsRepository } from '../modules/cars/repositories/implementations/SpecificationsRepository';

const specificationsRoutes = Router();

const specificationsRepository = new SpecificationsRepository();

specificationsRoutes.post("/", (request, response) => {
    const { name, description } = request.body;    
    const createSpecificationsService = new CreateSpecificationService(specificationsRepository);

    createSpecificationsService.execute({ name, description }); // << IRequest interface type

    return response.status(201).send();
})

specificationsRoutes.get("/", (request, response) => {
    const all = specificationsRepository.list();

    return response.json(all);
})

export { specificationsRoutes };