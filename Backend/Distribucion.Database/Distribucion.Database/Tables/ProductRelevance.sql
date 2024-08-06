CREATE TABLE [dbo].[ProductRelevance] (
    [RelevanceId]        INT IDENTITY (1, 1) NOT NULL,
    [RelevanceValue]     INT NULL,
    [RelevanceProductId] INT NULL,
    PRIMARY KEY CLUSTERED ([RelevanceId] ASC),
    UNIQUE NONCLUSTERED ([RelevanceValue] ASC)
);
GO
