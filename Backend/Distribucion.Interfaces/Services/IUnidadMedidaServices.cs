using Distribucion.Entidades;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Interfaces.Services
{
    public interface IUnidadMedidaServices
    {
        Task<List<UnidadMedidaEntity>> GetUnidadMedidaAll();
        Task Insert(UnidadMedidaEntity entity);
        Task Update(UnidadMedidaEntity entity);
        Task Delete(int IdUnidadMedida);
    }
}
