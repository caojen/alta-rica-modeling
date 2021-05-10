create table if not exists `alta`.`file` (
  `fid` int(11) auto_increment not null,
  `name` varchar(64) not null default 'untitled',
  `pid` int(11) not null,
  primary key(`fid`),
  foreign key(`pid`) references `project`(`pid`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;