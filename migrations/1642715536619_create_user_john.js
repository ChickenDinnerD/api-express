module.exports = {
    "up": "INSERT INTO `local-db`.`users` (`id`, `userName`) VALUES ('2', 'John');",
    "down": "DELETE FROM `local-db`.`users` WHERE (`userName` = 'John');"
}