using Distribucion.Entidades;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Interfaces
{
    public interface IProveedorRepository
    {
        Task<List<ProveedorEntity>> GetProveedorAll();
        Task<List<ProveedorEntity>> GetProveedorAllCiudad();
        Task<List<ProveedorEntity>> GetProveedorCiudadAll();
        Task Insert(ProveedorEntity entity);
        Task Update(ProveedorEntity entity);
        Task Delete(int IdProveedor);

        Task<List<CiudadEntity>> GetCiudades();

    }
}
