using Distribucion.Common.StoredProcedures;
using Distribucion.Entidades;
using Distribucion.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Repositorio
{
    public class ProveedorRepository : IProveedorRepository
    {
        private readonly IDapperHelper dapperHelper;

        public ProveedorRepository(IDapperHelper dapperHelper)
        {
            this.dapperHelper = dapperHelper;
        }

        public async Task Delete(int IdProveedor)
        {
            try
            {
                await dapperHelper.ExecuteSPonly(Proveedor.Delete, new
                {
                    @ProveedorId = IdProveedor
                });
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<List<ProveedorEntity>> GetProveedorAll()
        {
            try
            {
                return await dapperHelper.ExecuteSP_Multiple<ProveedorEntity>(Proveedor.GetAll);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<List<CiudadEntity>> GetCiudades()
        {
            try
            {
                return await dapperHelper.ExecuteSP_Multiple<CiudadEntity>(Proveedor.GetNewCiudades);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<List<ProveedorEntity>> GetProveedorAllCiudad()
        {
            try
            {
                return await dapperHelper.ExecuteSP_Multiple<ProveedorEntity>(Proveedor.GetAllCiudad);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<List<ProveedorEntity>> GetProveedorCiudadAll()
        {
            try
            {
                return await dapperHelper.ExecuteSP_Multiple<ProveedorEntity>(Proveedor.GetCiudadAll);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task Insert(ProveedorEntity entity)
        {
            try
            {
                await dapperHelper.ExecuteSPonly(Proveedor.Insert, new
                {
                    @ProveedorName = entity.ProveedorName,
                    @ProveedorPhone = entity.ProveedorPhone,
                    @ProveedorEmail = entity.ProveedorEmail,
                    @ProveedorAddress = entity.ProveedorAddress
                });
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task Update(ProveedorEntity entity)
        {
            try
            {
                await dapperHelper.ExecuteSPonly(Proveedor.Update, new
                {
                    @ProveedorId = entity.ProveedorId,
                    @ProveedorName = entity.ProveedorName,
                    @ProveedorPhone = entity.ProveedorPhone,
                    @ProveedorEmail = entity.ProveedorEmail,
                    @ProveedorAddress = entity.ProveedorAddress
                });
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
