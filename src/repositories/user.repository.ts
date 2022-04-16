import {IWrite} from 'src/repositories/interfaces/IWriteInterface';
import {IRead} from 'src/repositories/interfaces/IReadInterface';
import { Sequelize, DataTypes, QueryTypes } from 'sequelize';
import {connection} from '../connection';

const sequelize = new Sequelize('sqlite::memory:');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const User: object = sequelize.define('User', {
  id: {
    type: DataTypes.NUMBER,
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: true
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

export abstract class UserRepository<User> implements IWrite<User>, IRead<User> {

    public async findAll(): Promise<User[]> {

        const user = [];
        user.push(await connection.query('SELECT * FROM users', {type: QueryTypes.SELECT}));

        return user;
    }

    public async findOne(id: number): Promise<object> {

        const result = await connection.query(`SELECT * FROM users WHERE id = ${id}`, {type: QueryTypes.SELECT});

        return result[0];
    }

    public async createUser(name: string): Promise<number> {

        const [user] = await connection.query(`INSERT INTO users (userName) VALUES ('${name}')`, {type: QueryTypes.INSERT});

        return user;
    }

    public async findName(userName: string): Promise<number> {

        const [user] = await connection.query(`SELECT * FROM users WHERE userName = '${userName}'`, {type: QueryTypes.SELECT});

        if(!user) {
          return 0;
        }
        const id = user['id'];

        return id;
    }
}
