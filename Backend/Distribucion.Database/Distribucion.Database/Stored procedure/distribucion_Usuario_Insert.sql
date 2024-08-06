CREATE PROCEDURE [dbo].[distribucion_Usuario_Insert]
/* UserID es igual a fullName por ser un nvarchar (implementar algoritmo generador para UserID) */
    @UserID NVARCHAR(100),
    @FullName NVARCHAR(100),
    @Password NVARCHAR(100),
    @Email NVARCHAR(100),
    @Phone VARCHAR(50),
	@tipo NVARCHAR(20),
    @RoleDescription VARCHAR(50)
AS

INSERT INTO Usuario(
    UserID,
    FullName,
    Password,
    Email,
    Phone,
	Tipo,
    RoleDescription)
VALUES (
    @FullName,
	@FullName,
	@Password,
	@Email,
	@Phone,
    @tipo,
	@RoleDescription)
