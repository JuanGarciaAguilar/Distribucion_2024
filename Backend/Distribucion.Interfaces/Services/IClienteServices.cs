using Distribucion.Entidades;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Interfaces
{
    public interface IClienteServices
    {
        //Proyecto Antiguo
        Task<List<ClienteEntity>> GetCliente(int sector);

        //Proyecto Nuevo
        Task<List<ClienteEntity_nt>> GetClienteBySector(int sector);

        Task<ClienteEntity_nt> GetClienteById(int id);

        Task InsertCliente(ClienteEntity_nt cliente);

        Task UpdateCliente(ClienteEntity_nt cliente);
        Task PagarDeuda(int idCliente, decimal monto, string Observacion,string user, DateTime FechaPago);
        Task ActualizarPago(int ventaId,int idCliente, decimal monto, string Observacion, string user);

        Task<string> DeudaByClient(int idCliente);
    }
}
