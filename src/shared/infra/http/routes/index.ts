import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { carsRoutes } from './cars.routes';
import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';


const router = Router();

router.use("/categories", categoriesRoutes); // << puting the path here for no understandable reason
router.use("/specifications", specificationsRoutes); // << puting the path here for no understandable reason
router.use("/users", usersRoutes);
router.use("/cars", carsRoutes);
router.use(authenticateRoutes);

export { router }