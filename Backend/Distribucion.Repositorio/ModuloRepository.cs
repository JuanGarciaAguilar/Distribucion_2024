using Distribucion.Common.StoredProcedures;
using Distribucion.Entidades;
using Distribucion.Interfaces;
using Distribucion.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using static Dapper.SqlMapper;
using static Distribucion.Entidades.ModuloEntity;

namespace Distribucion.Repositorio
{
    public class ModuloRepository : IModuloRepository
    {
        private readonly IDapperHelper dapperHelper;

        public ModuloRepository(IDapperHelper dapperHelper)
        {
            this.dapperHelper = dapperHelper;
        }

        public Task<ResponseEntity> DeletePermiso(string cPersCod)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<dynamic>> GetMenu()
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<dynamic>> GetMenuSelected(string cPersCod, int RolId)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<dynamic>> GetModulo(string cPersCod)
        {
            var list = await dapperHelper.ExecuteSP_Multiple<dynamic>(Modulo.Distribucion_Modulo_Mant, new
            {
                @Option = 10,
                @cPersCod = cPersCod
            });


            var cabezera = new Cabecera();
            List<Cabecera> menu = new List<Cabecera>();
            foreach (var item in list)
            {
                if (item.padre == 0)
                {
                    var submenu = new Cabecera();

                    submenu.moduloid = item.moduloid;
                    submenu.label = item.label;
                    submenu.icon = item.icon;
                    submenu.routerLink = item.routerLink;
                    submenu.padre = item.padre;
                    submenu.items = funcionRecursiva(list, item.moduloid);
                    menu.Add(submenu);
                }
            }

            return menu;
        }

        public List<Cabecera> funcionRecursiva(IEnumerable<dynamic> listaPadre, int padre)
        {
            List<Cabecera> menu = new List<Cabecera>();

            foreach (var item in listaPadre)
            {
                if (item.padre == padre)
                {
                    var submenu = new Cabecera();
                    submenu.moduloid = item.moduloid;
                    submenu.label = item.label;
                    submenu.icon = item.icon;
                    submenu.routerLink = item.routerLink;
                    submenu.padre = item.padre;
                    submenu.items = funcionRecursiva(listaPadre, item.moduloid);
                    menu.Add(submenu);

                }
            }
            return menu;
        }

        public Task<IEnumerable<ModuloEntity.PersonalSistema>> GetPersonalSistema()
        {
            throw new NotImplementedException();
        }

        public Task<ResponseEntity> InsertPermisos(List<ModuloEntity.PermisosEntity> entity)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<ResponseEntity>> ValidacionRutasPorUsuario(ModuloEntity.ValidacionRutaEntity ent)
        {
            throw new NotImplementedException();
        }
    }
}
