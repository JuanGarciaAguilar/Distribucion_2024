using Distribucion.Entidades;
using Distribucion.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Servicios
{
    public class ClienteServices : IClienteServices
    {
        private readonly IClienteRepository clienteRepository;

        public ClienteServices(IClienteRepository clienteRepository)
        {
            this.clienteRepository = clienteRepository;
        }

        //Proyecto Antiguo
        public async Task<List<ClienteEntity>> GetCliente(int sector)
        {
            return await clienteRepository.GetCliente(sector);
        }

        //Proyecto Nuevo
        public async Task<List<ClienteEntity_nt>> GetClienteBySector(int sector)
        {
            return await clienteRepository.GetClienteBySector(sector);
        }

        public async Task InsertCliente(ClienteEntity_nt cliente)
        {
            try
            {
                await clienteRepository.InsertCliente(cliente);
            }
            catch (Exception e)
            { 

                throw e;
            }
            
        }

        public async Task<ClienteEntity_nt> GetClienteById(int id)
        {
            return await clienteRepository.GetClienteById(id);
        }

        public async Task UpdateCliente(ClienteEntity_nt cliente)
        {
            await clienteRepository.UpdateCliente(cliente);
        }

        public async Task PagarDeuda(int idCliente, decimal monto, string Observacion, string user, DateTime FechaPago)
        {
            try
            {
                await clienteRepository.PagarDeuda(idCliente, monto, Observacion, user, FechaPago);
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
                await clienteRepository.ActualizarPago(ventaId,idCliente, monto, Observacion, user);
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
                return await clienteRepository.DeudaByClient(idCliente);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
