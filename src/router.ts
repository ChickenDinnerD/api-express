import { Request, Response, Router, NextFunction } from 'express';
import { oneOf, body, validationResult } from 'express-validator';
import { UserRepository } from './userRepo';
const mysql = require("mysql2");

const usersRouter = Router();
const repo = new UserRepository;

const pool = mysql.createPool({
    connectionLimit: 5,
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

usersRouter.get('/users', (req: Request, res: Response) => {
    
    const users = repo.getAll();
    console.log(users);
    res.send(users);
    // pool.query('SELECT * FROM users', (err, rows) => {
    //     if(err) throw err;

    //     res.send(rows);
    // });
});

usersRouter.post('/user', oneOf([body('id').isInt().isLength({min: 1})]),
(req: Request, res: Response) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };

    const uid = req.body.id;

    pool.query(`SELECT * FROM users WHERE id = ?`, uid, (err, rows) => {
        if(err) console.log(err);

        res.send(rows);
    });
});

usersRouter.put('/user', oneOf([body('userName').isString().isLength({min: 3, max: 15})]),
    async (req: Request, res: Response, next: NextFunction) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        };

        const uName = req.body.userName;

        const userPromis = new Promise((resolve, rejects) => {            
            pool.query(`SELECT COUNT(userName) AS count FROM users WHERE userName = ?`, uName, (err, rows) => {
                err ? rejects(err) : resolve(rows[0].count);
            });
        });
        const result = await userPromis

        if(result === 1){
            res.status(400).json({message: "This username already in use!"});
        };
        if(result === 0){
        pool.query(`INSERT INTO users (userName) VALUES (?)`, uName, (err, rows) => {
            if(err) console.log(err);
            res.status(200).json({message: `New user has been created with id: ${rows.insertId}`});
        });
        };
    }
);

export {usersRouter};
