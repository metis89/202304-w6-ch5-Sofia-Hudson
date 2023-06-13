import { Router as createRouter } from 'express';
import { DataController } from '../controllers/controller.js';
import { DataRepo } from '../repository/data.repository.js';

const repo = new DataRepo();
const controller = new DataController();
export const thingsIHateRouter = createRouter();

thingsIHateRouter.get('/', controller.getAll.bind(controller));
thingsIHateRouter.get('/:id', controller.getById.bind(controller));
thingsIHateRouter.post('/', controller.post.bind(controller));
thingsIHateRouter.patch('/:id', controller.patch.bind(controller));
thingsIHateRouter.delete('/:id', controller.delete.bind(controller));
