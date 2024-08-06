using Distribucion.Entidades;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Interfaces
{
    public interface ISectorServices
    {
        Task<List<SectorEntity>> GetSectorAll();
        Task Insert(SectorEntity entity);
        Task Update(SectorEntity entity);
        Task Delete(int IdSector);

    }
}
