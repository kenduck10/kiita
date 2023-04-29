#!/bin/sh

CMD_MYSQL="mysql -u root -p${MYSQL_ROOT_PASSWORD}"
$CMD_MYSQL -e  "create database if not exists kiita_ut;"
$CMD_MYSQL -e  "grant all on kiita_ut.* to user;"
$CMD_MYSQL -e  "create database if not exists kiita_e2e;"
$CMD_MYSQL -e  "grant all on kiita_e2e.* to user;"
