-- CreateTable
CREATE TABLE "Blogs" (
    "id" SERIAL NOT NULL,
    "authors" VARCHAR(255)[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "urls" VARCHAR(100)[],
    "description" VARCHAR(255) NOT NULL,
    "tags" VARCHAR(255)[],
    "image" TEXT NOT NULL,
    "imageDelete" TEXT NOT NULL,

    CONSTRAINT "Blogs_pkey" PRIMARY KEY ("id")
);
