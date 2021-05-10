create table if not exists `alta`.`project` (
  `pid` int(11) auto_increment not null,
  `name` varchar(64) not null,
  primary key(`pid`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;