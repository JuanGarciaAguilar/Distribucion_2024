using Distribucion.Common.StoredProcedures;
using Distribucion.Entidades;
using Distribucion.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Repositorio
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly IDapperHelper dapperHelper;
        public UsuarioRepository(IDapperHelper dapperHelper)
        {
            this.dapperHelper = dapperHelper;
        }

        public async Task<List<UsuarioEntity>> GetAll()
        {
            return await dapperHelper.ExecuteSP_Multiple<UsuarioEntity>(Usuario.distribucion_Usuario_GetAll);
        }

        public async Task InsertUsuario(UsuarioEntity U)
        {
            try
            {
                string uservalidado = await dapperHelper.ExecuteSP_Single<string>(Usuario.VALIDACION, new
                {
                    @UserID = U.FullName,
                    @Email = U.Email,
                    @Phone = U.Phone
                });

                int userExist = Convert.ToInt32(uservalidado);

                if (userExist == 1)
                {
                    var ex = new ArgumentException("Usuario");
                    throw ex;
                }
                else if (userExist == 2)
                {
                    var ex = new ArgumentException("Email");
                    throw ex;
                }
                else if (userExist == 3)
                {
                    var ex = new ArgumentException("Phone");
                    throw ex;
                }
                else
                {
                    try
                    {
                        await dapperHelper.ExecuteSPonly(Usuario.distribucion_Usuario_Insert, new
                        {
                            @UserID = U.FullName,
                            @FullName = U.FullName,
                            @Password = U.Password,
                            @Email = U.Email,
                            @Phone = U.Phone,
                            @RoleDescription = U.RoleDescription,
                            @tipo = U.tipo
                        });
                    }
                    catch (Exception e)
                    {

                        throw e;
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            
        }

        public async Task UpdateUsuario(UsuarioEntity U)
        {
            await dapperHelper.ExecuteSPonly(Usuario.distribucion_Usuario_Update, new
            {
                @UserID = U.UserID,
                @FullName = U.FullName,
                @Pass = U.Password,
                @Email = U.Email,
                @Phone = U.Phone,
                @RoleDescription = U.RoleDescription,
                @tipo = U.tipo
            });
        }
        public async Task DeleteUsuario(string UserId)
        {
            await dapperHelper.ExecuteSPonly(Usuario.distribucion_Usuario_Delete, new
            {
                @UserID = UserId
            });
        }

        public async Task<UsuarioEntity> Login(UsuarioEntity u)
        {
            try
            {
                return await dapperHelper.ExecuteSP_Single<UsuarioEntity>(Usuario.distribucion_Usuario_Login, new
                {
                    @Email = u.Email,
                    @Passw = u.Password
                });
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
