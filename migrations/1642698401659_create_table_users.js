module.exports = {
    "up": "CREATE TABLE users (id INT NOT NULL AUTO_INCREMENT, userName VARCHAR(20) NOT NULL, PRIMARY KEY (`id`), UNIQUE INDEX `userName_UNIQUE` (`userName`))",
    "down": "DROP TABLE `local-db`.`users`;"
}