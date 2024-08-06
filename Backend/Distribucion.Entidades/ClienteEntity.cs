using System;
using System.Collections.Generic;
using System.Text;

namespace Distribucion.Entidades
{
    public class ClienteEntity
    {
        public int IdCliente { get; set; }
        public string NombreCliente { get; set; }
        public string Direccion { get; set; }
        public string Telefono { get; set; }
        public string Celular { get; set; }
        public double UltimoPrecio { get; set; }
        public double DeudaAcumulada { get; set; }
        public int Sector { get; set; }
    }
}
