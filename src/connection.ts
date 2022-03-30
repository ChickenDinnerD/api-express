import {Sequelize} from 'sequelize';

export const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.HOST,
    port: +process.env.PORT2,
    dialect: 'mysql'
});
