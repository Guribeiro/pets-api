import { Router } from 'express';
import CreateUserController from '@modules/users/http/useCase/CreateUser/CreateUserController';

const usersRouter = Router();

const createUserController = new CreateUserController();

usersRouter.post('/', createUserController.handle);

export default usersRouter;
