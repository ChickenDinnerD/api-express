# api-express
Test work api with TypeScript and Express

{
Create node express API, that can handle operations with MySQL/MariaDB server and must have three endpoints.
It might have on the database a table called users with id field and userName field to be filled with couple example users.

- Endpoint #1
Type: GET
Endpoint URL: /users
Payload: None
Expected result: Provide JSON array of users from DB

- Endpoint #2
Type: POST
Endpoint URL: /user
Payload: {userId:X} // where x is a number (integer)
Expected result: Provide JSON object of user by userId in the database

- Endpoint #3
Type: PUT
Endpoint URL: /user
Payload: {userName:'UserTest'}
Expected result: Insert an user to table and in return provides JSON object of operation status code (200/500) with new userId on DB
}

To start run:
docker-compose up

Also you need config .env
