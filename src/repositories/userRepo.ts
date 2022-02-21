import {IWrite} from './interfaces/IWriteInterface';
import {IRead} from './interfaces/IReadInterface';
import { QueryTypes, Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.HOST,
    port: 3306,
    dialect: 'mysql'
});

async function ckeckConn() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
    console.error('Unable to connect to the database:', error);
    }
}

ckeckConn();

export abstract class UserRepository<T> implements IWrite<T>, IRead<T> {

    public async findAll(): Promise<object[]> {

        return await sequelize.query('SELECT * FROM users', {type: QueryTypes.SELECT});
    }

    public async findOne(id: string): Promise<object[]> {

        return await sequelize.query(`SELECT * FROM users WHERE id = ${id}`, {type: QueryTypes.SELECT});
    }

    public async createUser(name: string): Promise<[number, number]> {

        return sequelize.query(`INSERT INTO users (userName) VALUES ('${name}')`, {type: QueryTypes.INSERT});
    }

    public async findName(uName: string): Promise<object[]> {

        return await sequelize.query(`SELECT * FROM users WHERE userName = '${uName}'`, {type: QueryTypes.SELECT});
    }
}
