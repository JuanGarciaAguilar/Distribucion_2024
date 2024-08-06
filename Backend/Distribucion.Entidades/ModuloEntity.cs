using System;
using System.Collections.Generic;
using System.Text;

namespace Distribucion.Entidades
{
    public class ModuloEntity
    {
        public class Cabecera
        {
            public int moduloid { get; set; }
            public string label { get; set; }
            public string icon { get; set; }
            public string routerLink { get; set; }
            public int padre { get; set; }
            public List<Cabecera> items { get; set; } = new List<Cabecera>();
        }



        public class RolEntity
        {
            public int RolId { get; set; }
            public string Titulo { get; set; }
            public string Descripcion { get; set; }
            public int Estado { get; set; }
        }

        public class RolDetalleEntity
        {
            public int DetalleId { get; set; }
            public string cPersCod { get; set; }
            public int RolId { get; set; }
            public string UsuarioOpe { get; set; }
            public int Estado { get; set; }
        }

        public class MenuEntity
        {
            public int key { get; set; }
            public string label { get; set; }
            public string data { get; set; }
            public string icon { get; set; }
            public int padre { get; set; }
            public List<MenuEntity> children { get; set; } = new List<MenuEntity>();
        }

        public class PermisosEntity
        {
            public int ModuloId { get; set; }
            public string cPersCod { get; set; }
        }

        public class ValidacionRutaEntity
        {
            public string routerLink { get; set; }
            public string cPersCod { get; set; }
        }

        public class PersonalSistema
        {
            public string cPersCod { get; set; }
            public string Personal { get; set; }
        }
    }
}
