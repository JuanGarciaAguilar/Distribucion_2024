using System;
using System.Collections.Generic;
using System.Text;
using static Distribucion.Entidades.ModuloEntity;
using System.Threading.Tasks;
using Distribucion.Entidades;

namespace Distribucion.Interfaces.Repositories
{
    public interface IModuloRepository
    {
        Task<IEnumerable<PersonalSistema>> GetPersonalSistema();
        Task<IEnumerable<dynamic>> GetModulo(string cPersCod);
        Task<IEnumerable<dynamic>> GetMenu();
        Task<IEnumerable<dynamic>> GetMenuSelected(string cPersCod, int RolId);
        Task<ResponseEntity> InsertPermisos(List<PermisosEntity> entity);
        Task<ResponseEntity> DeletePermiso(string cPersCod);
        Task<IEnumerable<ResponseEntity>> ValidacionRutasPorUsuario(ValidacionRutaEntity ent);
    }
}
