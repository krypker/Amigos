-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "address" TEXT NOT NULL UNIQUE,
    "nombre" TEXT NOT NULL,
    "limiteMinteo" INTEGER NOT NULL DEFAULT 1,
    "fechaCreacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
