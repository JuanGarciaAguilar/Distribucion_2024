CREATE PROCEDURE [dbo].[distribucion_Usuario_Update]
@UserId nvarchar(100),
@FullName nvarchar(100),
@Email nvarchar(100),
@Phone varchar(50),
@tipo nvarchar(20),
@RoleDescription varchar(50)
AS
UPDATE Usuario set 
			
			FullName= @FullName,
			Email =@Email,
			Phone =@Phone,
			Tipo=@tipo,
			RoleDescription=@RoleDescription
			WHERE  UserID= @UserId
