using System;
using System.Collections.Generic;
using System.Text;

namespace Distribucion.Entidades.Business
{
    public class ReporteSaldoDepositoEntity
    {
        public int ProveedorId { get; set; }
        public string ProveedorName { get; set; }
        public decimal SaldoDeposito { get; set; }
    }
}
