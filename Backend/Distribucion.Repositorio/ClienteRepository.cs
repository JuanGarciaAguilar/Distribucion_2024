using Distribucion.Common.StoredProcedures;
using Distribucion.Entidades;
using Distribucion.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Repositorio
{
    public class ClienteRepository : IClienteRepository
    {
        private readonly IDapperHelper dapperHelper;

        public ClienteRepository(IDapperHelper dapperHelper)
        {
            this.dapperHelper = dapperHelper;
        }

        //Proyecto Antiguo
        public async Task<List<ClienteEntity>> GetCliente (int sector)
        {
            return await dapperHelper.ExecuteSP_Multiple<ClienteEntity>(GetClientes.mobile_GetCliente, new
            {
                @Sector = sector
            });
        }

        //Nuevo Proyecto
        public async Task<List<ClienteEntity_nt>> GetClienteBySector(int sector)
        {
            return await dapperHelper.ExecuteSP_Multiple<ClienteEntity_nt>(SpGetClienteBySector.distribucion_Cliente_GetBySector, new
            {
                @sectorid = sector
            });
        }

        public async Task InsertCliente(ClienteEntity_nt cliente)
        {
            

            int clientExist;
            string clientevalidado = await dapperHelper.ExecuteSP_Single<string>(Cliente.distribucion_ValidarCliente, new
            {
                @ClienteName = cliente.ClienteName,
                @SectorId = cliente.SectorId
            });

            clientExist = Convert.ToInt32(clientevalidado);

            if (clientExist != 0)
            {
                var ex = new ArgumentException("Duplicado");
                throw ex;
            }
            else
            {
                try
                {
                    await dapperHelper.ExecuteSPonly(SpInsertCliente.distribucion_Cliente_Insert, new
                    {
                        @ClienteName = cliente.ClienteName,
                        @ClienteAddress = cliente.ClienteAddress,
                        @ClientePhone = cliente.ClientePhone,
                        @SectorId = cliente.SectorId
                    });
                }
                catch (Exception e)
                {

                    throw e;
                }
            }
            
        }

        public async Task<ClienteEntity_nt> GetClienteById(int id)
        {
            return await dapperHelper.ExecuteSP<ClienteEntity_nt>(SpGetClienteById.distribucion_Cliente_GetById, new
            {
                @ClienteId = id
            });
        }

        public async Task UpdateCliente(ClienteEntity_nt cliente)
        {
            await dapperHelper.ExecuteSPonly(SpUpdateCliente.distribucion_Cliente_Update, new
            {
                @ClienteId = cliente.ClienteId,
                @ClienteName = cliente.ClienteName,
                @ClienteAddress = cliente.ClienteAddress,
                @ClientePhone = cliente.ClientePhone,
                @SectorId = cliente.SectorId
            });
        }

        public async Task PagarDeuda(int idCliente, decimal monto, string Observacion, string user, DateTime FechaPago)
        {
            try
            {
                await dapperHelper.ExecuteSPonly(Cliente.distribucion_Cliente_ActualizaPago, new
                { @IDCliente = idCliente, @Monto = monto, @Observacion = Observacion, @usuario= user, @FechaVenta = FechaPago });
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        public async Task ActualizarPago(int ventaId,int idCliente, decimal monto, string Observacion, string user)
        {
            try
            {
                await dapperHelper.ExecuteSPonly(Cliente.distribucion_Cliente_ActualizaAdelanto, new
                { @ventaId = ventaId, 
                  @IDCliente = idCliente, 
                  @Monto = monto, 
                  @Observacion = Observacion, 
                  @usuario = user });
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        public async Task<string> DeudaByClient(int idCliente)
        {
            try
            {
                string deuda = await dapperHelper.ExecuteSP_Single<string>(Cliente.distribucion_Cliente_GetDeudaByClient, new
                {
                    @ClientID = idCliente
                });

                return deuda;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

      
    }
}
