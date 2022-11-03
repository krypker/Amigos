-- RedefineIndex
DROP INDEX "sqlite_autoindex_Users_1";
CREATE UNIQUE INDEX "Users_address_key" ON "Users"("address");
