/*
  Warnings:

  - Added the required column `endAt` to the `Barber` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startedAt` to the `Barber` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Barber" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,
    "appointments" TEXT NOT NULL,
    "startedAt" INTEGER NOT NULL,
    "endAt" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Barber" ("appointments", "avatarUrl", "createdAt", "email", "id", "password") SELECT "appointments", "avatarUrl", "createdAt", "email", "id", "password" FROM "Barber";
DROP TABLE "Barber";
ALTER TABLE "new_Barber" RENAME TO "Barber";
CREATE UNIQUE INDEX "Barber_id_key" ON "Barber"("id");
CREATE UNIQUE INDEX "Barber_email_key" ON "Barber"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
