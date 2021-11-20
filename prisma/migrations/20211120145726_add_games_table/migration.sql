-- AlterTable
ALTER TABLE "genres" ADD COLUMN     "gamesId" INTEGER;

-- AlterTable
ALTER TABLE "platforms" ADD COLUMN     "gamesId" INTEGER;

-- CreateTable
CREATE TABLE "games" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "cover" TEXT,
    "thumbnail" TEXT,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_gamesTogenres" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_gamesToplatforms" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_gamesTogenres_AB_unique" ON "_gamesTogenres"("A", "B");

-- CreateIndex
CREATE INDEX "_gamesTogenres_B_index" ON "_gamesTogenres"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_gamesToplatforms_AB_unique" ON "_gamesToplatforms"("A", "B");

-- CreateIndex
CREATE INDEX "_gamesToplatforms_B_index" ON "_gamesToplatforms"("B");

-- AddForeignKey
ALTER TABLE "_gamesTogenres" ADD FOREIGN KEY ("A") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_gamesTogenres" ADD FOREIGN KEY ("B") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_gamesToplatforms" ADD FOREIGN KEY ("A") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_gamesToplatforms" ADD FOREIGN KEY ("B") REFERENCES "platforms"("id") ON DELETE CASCADE ON UPDATE CASCADE;
