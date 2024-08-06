CREATE TABLE [dbo].[User](
    [UserID] [nvarchar](50) NOT NULL,
	[UserPassword] [nvarchar](200) NOT NULL,
	[UserFirstName] [nvarchar](100) NOT NULL,
	[UserLastName] [nvarchar](100) NOT NULL,
	[UserDNI] [nvarchar](11) NOT NULL,
	[UserEmail] [nvarchar](100) NULL,
	[UserPhone] [nvarchar](50) NULL,
	[UserState] [bit] NOT NULL default 1,
	[CreationDate] [datetime] NOT NULL,
	[CreationUser] [nvarchar](50) NOT NULL,
	[UpdateDate] [datetime] NOT NULL,
	[UpdateUser] [nvarchar](50) NOT NULL,
CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]