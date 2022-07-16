-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('credit', 'debit', 'both');

-- CreateTable
CREATE TABLE "Cards" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "number" TEXT NOT NULL,
    "cardName" TEXT NOT NULL,
    "cvv" TEXT NOT NULL,
    "expirationDate" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isVirtual" BOOLEAN NOT NULL,
    "type" "CardType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cards_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cards" ADD CONSTRAINT "Cards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
