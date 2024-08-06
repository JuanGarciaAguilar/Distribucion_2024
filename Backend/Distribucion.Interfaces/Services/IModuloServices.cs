using Distribucion.Entidades;
using System;
using System.Collections.Generic;
using System.Text;
using static Distribucion.Entidades.ModuloEntity;
using System.Threading.Tasks;

namespace Distribucion.Interfaces.Services
{
    public interface IModuloServices
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
