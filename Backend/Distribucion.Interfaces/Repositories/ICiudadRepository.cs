using Distribucion.Entidades;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Interfaces.Repositories
{
    public interface ICiudadRepository
    {

        Task<List<CiudadEntity>> GetNewCiudades();
        Task InsertCiudad(CiudadEntity entity);
        Task UpdateCiudad(CiudadEntity entity);
    }
}
