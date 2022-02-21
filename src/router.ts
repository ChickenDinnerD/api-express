import { Request, Response, Router } from 'express';
import { oneOf, body, validationResult } from 'express-validator';
import { UserRepository } from './repositories/userRepo';

const usersRouter = Router();
const repo = new class Repository<T> extends UserRepository<T> {};

usersRouter.get('/users',
    async (req: Request, res: Response) => {
        res.send(await repo.findAll());
    }
);

usersRouter.post('/user', oneOf([body('id').isInt().isLength({min: 1})]),
    async (req: Request, res: Response) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const uid = req.body.id;

        res.send(await repo.findOne(uid));
    }
);

usersRouter.put('/user', oneOf([body('userName').isString().isLength({min: 3, max: 15})]),
    async (req: Request, res: Response) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const uName = req.body.userName;
        const result = await repo.findName(uName);

        if(result[0]){
            res.status(400).json({message: "This username already in use!"});
        }
        if(!result[0]){
        const newUser = await repo.createUser(uName);
        res.send(`'${newUser[0]}'`);
        }
    }
);

export {usersRouter};
