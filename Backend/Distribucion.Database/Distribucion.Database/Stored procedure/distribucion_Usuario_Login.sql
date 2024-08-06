CREATE PROCEDURE dbo.distribucion_Usuario_Login  
@Email NVARCHAR(100),  
@Passw NVARCHAR(200)  
AS  
SELECT UserId,FullName,Phone,RoleDescription,UserState  
FROM Usuario   
WHERE Email = @Email AND Password=@Passw  