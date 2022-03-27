import { Request, Response, Router } from 'express';
import { oneOf, body } from 'express-validator';
import { userService } from './service';

const usersRouter = Router();
const service = new class Service extends userService {};

usersRouter.get('/users',
    async (req: Request, res: Response) => {
        service.getUsers(req, res);
    }
);


usersRouter.post('/user', oneOf([body('id').isInt().isLength({min: 1})]),
    async (req: Request, res: Response) => {
        service.postUser(req, res);
    }
);

usersRouter.put('/user', oneOf([body('userName').isString().isLength({min: 3, max: 15})]),
    async (req: Request, res: Response) => {
        service.putUser(req, res);
    }
);

export {usersRouter};
