using System;
using System.Collections.Generic;
using System.Text;

namespace Distribucion.Entidades
{


    public class ResponseEntity
    {
        public Boolean Estado { get; set; }
        public string Message { get; set; }
        public int Id { get; set; }
    }

    public class ResponseToken
    {
        public Boolean Estado { get; set; }
        public string Token { get; set; }
        public List<dynamic> Data { get; set; } = new List<dynamic>();
    }
}
