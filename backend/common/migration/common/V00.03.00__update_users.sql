UPDATE users
SET mail_address = CONCAT('dummy', CAST(id AS CHAR), '@xxx.com');