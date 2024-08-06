using Distribucion.Entidades;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Interfaces.Repositories
{
    public  interface IUnidadMedidaRepository
    {
        Task<List<UnidadMedidaEntity>> GetUnidadMedidarAll();
        Task Insert(UnidadMedidaEntity entity);
        Task Update(UnidadMedidaEntity entity);
        Task Delete(int Idunidadmedida);
    }
}
