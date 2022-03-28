import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import {usersRouter} from '../src/router';
import {connection} from '../src/connection';
const app = express();
const PORT = process.env.PORT;

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
