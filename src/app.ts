import express from 'express';
import 'dotenv/config';
import {usersRouter} from './router'
import bodyParser from 'body-parser';

const app = express();

const PORT = process.env.PORT;

function bootstrap () {
    app.listen(PORT, () => {
    console.log('Server running on port: ', PORT);
    })
}

app.use(bodyParser.json());
app.use(usersRouter);

bootstrap();
