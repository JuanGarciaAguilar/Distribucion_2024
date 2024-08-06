using System;
using System.Collections.Generic;
using System.Text;

namespace Distribucion.Entidades.Business
{
    public class ReporteCierreDiarioCabeceraEntity
    {
        public int Id { get; set; }
        public string HeaderGroup { get; set; }
        public string Title { get; set; }
        public string Field { get; set; }
        public string Width { get; set; }
    }
}
