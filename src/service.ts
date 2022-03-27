import { validationResult } from 'express-validator';
import { Request, Response } from 'express';
import { UserRepository } from '../src/repositories/user.repository';

const repo = new class Repository<T> extends UserRepository<T> {};

export class userService {

    public async postUser(req: Request, res: Response){

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id: uid } = req.body;

        const user = await repo.findOne(uid);
        return res.send(user);
    }

    public async getUsers(req: Request, res: Response){
        return res.send(await repo.findAll());
    }

    public async putUser(req: Request, res: Response){

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { userName: uName } = req.body;
        const result = await repo.findName(uName);

        if(result === 0){
            const id = await repo.createUser(uName);
            return res.status(201).json({message: 'New user created with id:', id});
        }
        return res.status(400).json({message: "This username already in use!"});
    }
}
