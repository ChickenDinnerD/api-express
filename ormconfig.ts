export = {
    "type": "mysql",
    "host": process.env.HOST,
    "port": 3306,
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "synchronize": false,
    "logging": false,
    "migrations": [
       "migrations/*.js"
    ],
    "cli": {
       "migrationsDir": "migrations"
    }
}