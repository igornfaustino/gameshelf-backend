-- CreateTable
CREATE TABLE "UserGameSituation" (
    "userId" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,
    "situationId" INTEGER NOT NULL,

    CONSTRAINT "UserGameSituation_pkey" PRIMARY KEY ("userId","gameId")
);

-- AddForeignKey
ALTER TABLE "UserGameSituation" ADD CONSTRAINT "UserGameSituation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGameSituation" ADD CONSTRAINT "UserGameSituation_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGameSituation" ADD CONSTRAINT "UserGameSituation_situationId_fkey" FOREIGN KEY ("situationId") REFERENCES "Situation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
