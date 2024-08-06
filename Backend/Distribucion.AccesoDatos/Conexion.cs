using System;

namespace Distribucion.AccesoDatos
{
    public class Conexion
    {
        public static string ConexionBD() {
            string sqlConnection = "Server = 192.168.0.28:1433;Initial Catalog = Distribucion_DEV; Persist Security Info=False;User ID = sa; Password=9090; Connection Timeout = 30;";
            //string sqlConnection = "Persist Security Info = False; Integrated Security = true; Initial Catalog = DISTRIBUCIONDB; server = (localdb)\\.";
            return sqlConnection;
        }
    }
}
