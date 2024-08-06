CREATE TABLE [dbo].[UserRole] (
    [UserRoleID]    INT           NOT NULL,
    [UserID]        NVARCHAR (50) NOT NULL,
    [RoleID]        INT           NOT NULL,
    [UserRoleState] BIT           DEFAULT ((1)) NOT NULL,
    [CreationDate]  DATETIME      NOT NULL,
    [CreationUser]  NVARCHAR (50) NOT NULL,
    [UpdateDate]    DATETIME      NOT NULL,
    [UpdateUser]    NVARCHAR (50) NOT NULL,
    CONSTRAINT [PK_UserRole] PRIMARY KEY CLUSTERED ([UserRoleID] ASC)
);
GO
