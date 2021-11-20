/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `situations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "situations_name_key" ON "situations"("name");
