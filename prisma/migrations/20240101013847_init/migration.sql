-- CreateTable
CREATE TABLE "PressRelease" (
    "ticker" STRING NOT NULL,
    "fullName" STRING NOT NULL,
    "shortName" STRING,
    "caseType" STRING,
    "leadPlaintiffDeadline" TIMESTAMP(3),
    "classPeriodStartDate" TIMESTAMP(3),
    "classPeriodEndDate" TIMESTAMP(3),
    "caseDetails" STRING,
    "ipoDate" TIMESTAMP(3),
    "investigationParagraph" STRING,
    "purchaseDate" TIMESTAMP(3),
    "spacFullName" STRING,
    "spacShortName" STRING,
    "mergerDate" TIMESTAMP(3),
    "exchange" STRING,
    "content" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PressRelease_pkey" PRIMARY KEY ("ticker")
);
