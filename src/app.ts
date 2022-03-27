import 'dotenv/config';
import express from 'express';
import {Sequelize} from 'sequelize';
import bodyParser from 'body-parser';
import {usersRouter} from '../src/router';

const app = express();
const PORT = process.env.PORT;

export const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.HOST,
    port: +process.env.PORT2,
    dialect: 'mysql'
});

async function ckeckConn() {
    try {
        await connection.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
    console.error('Unable to connect to the database:', error);
    }
}

ckeckConn();


function bootstrap (): void {
    app.listen(PORT, () => {
    console.log('Server running on port: ', PORT);
    });
}

app.use(bodyParser.json());
app.use(usersRouter);

bootstrap();
