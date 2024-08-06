using System;
using System.Collections.Generic;
using System.Text;

namespace Distribucion.Entidades
{
    public class ClienteEntity_nt
    {
        public int ClienteId { get; set; }
        public string ClienteName { get; set; }
        public string ClienteAddress { get; set; }
        public string ClientePhone { get; set; }
        public int SectorId { get; set; }
        public decimal DeudaActualizada { get; set; }
    }
}
