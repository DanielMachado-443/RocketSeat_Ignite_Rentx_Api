import { Router } from 'express';
import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';

const router = Router();

router.use("/categories", categoriesRoutes); // << puting the path here for no understandable reason
router.use("/specifications", specificationsRoutes); // << puting the path here for no understandable reason

export { router }