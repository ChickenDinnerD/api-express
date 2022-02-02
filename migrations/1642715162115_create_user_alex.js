module.exports = {
    "up": "INSERT INTO `local-db`.`users` (`id`, `userName`) VALUES ('1', 'Alex');",
    "down": "DELETE FROM `local-db`.`users` WHERE (`userName` = 'Alex');"
}