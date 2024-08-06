using Distribucion.Entidades;
using Distribucion.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Servicios
{
    public class ProveedorServices : IProveedorServices
    {
        private readonly IProveedorRepository proveedorRepository;

        public ProveedorServices(IProveedorRepository proveedorRepository)
        {
            this.proveedorRepository = proveedorRepository;
        }

        public async Task<List<ProveedorEntity>> GetProveedorAll()
        {
            return await proveedorRepository.GetProveedorAll();
        }
        public async Task<List<CiudadEntity>> GetCiudades()
        {
            return await proveedorRepository.GetCiudades();
        }

        public async Task<List<ProveedorEntity>> GetProveedorAllCiudad()
        {
            return await proveedorRepository.GetProveedorAllCiudad();
        }

        public async Task<List<ProveedorEntity>> GetProveedorCiudadAll()
        {
            return await proveedorRepository.GetProveedorCiudadAll();
        }

        public async Task Delete(int IdProveedor)
        {
            await proveedorRepository.Delete(IdProveedor);
        }

        public async Task Insert(ProveedorEntity entity)
        {
            await proveedorRepository.Insert(entity);
        }


        public async Task Update(ProveedorEntity entity)
        {
            await proveedorRepository.Update(entity);
        }
    }
}
