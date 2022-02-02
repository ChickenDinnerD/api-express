import { Request, Response, Router, NextFunction } from 'express';
import { oneOf, body, validationResult } from 'express-validator';
const mysql = require("mysql2");

const pool = mysql.createPool({
    connectionLimit: 5,
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const usersRouter = Router();

// now, we have all code implementation from BaseRepository
export class UserRepository {
  // here, we can create all specific stuffs of Product Repository
    getAll() {
        usersRouter.get('/users', (req: Request, res: Response) => {

            pool.query('SELECT * FROM users', (err, rows) => {
                if(err) throw err;

                res.send(rows);
            });
        });
    };
};
