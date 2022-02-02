module.exports = {
    "up": "INSERT INTO `local-db`.`users` (`id`, `userName`) VALUES ('3', 'Ivan');",
    "down": "DELETE FROM `local-db`.`users` WHERE (`userName` = 'Ivan');"
}