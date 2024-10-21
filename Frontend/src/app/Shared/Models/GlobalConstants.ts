export class GlobalConstants {
    //? -- ENTORNO IIS SERVIDOR 10.0.100.107
    //  static API: string = 'http://10.0.100.107/Control_Interno_Api/api/';
   // static DOMINIO : string = 'http://10.0.100.107/Control_Interno_Api/';
    //? ---------------------------------------------

    //? ---------- ENTORNO IIS LOCAL -------------------
    // static API: string = 'http://localhost:9595/api/';
    //static DOMINIO : string = 'http://localhost:9595/';
    //? -------------------------------------------------

    //? -- -------ENTORNO DESARROLLO--------------------
    //static API: string = 'http://localhost:51628/api/';
    //static DOMINIO: string = 'http://localhost:51628/';
    //? ------------------------------------------------
 //? -- -------ENTORNO produccion--------------------
    protected API: string = 'http://distribuye-dis-go-api.azurewebsites.net/api/';
    static API: string = 'http://distribuye-dis-go-api.azurewebsites.net/api/';
 //? ------------------------------------------------


 public static Usuario: string = GlobalConstants.API + 'Usuario/';
    public static Modulo: string = GlobalConstants.API + 'Modulo/';
    public static Producto: string = GlobalConstants.API + 'Producto/';
    public static Ventas: string = GlobalConstants.API + 'Venta/';
    public static Sector: string = GlobalConstants.API + 'Sector/';
    public static Cliente_nt: string = GlobalConstants.API + 'Cliente_nt/';
    public static Cliente: string = GlobalConstants.API + 'Cliente/';
    public static Stock: string = GlobalConstants.API + 'Stock/';
    public static Compra: string = GlobalConstants.API + 'Compra/';
    public static CompraDetalle: string = GlobalConstants.API + 'CompraDetalle/';
    public static Proveedor: string = GlobalConstants.API + 'Proveedor/';
    public static Gastos: string = GlobalConstants.API + 'Gasto/';
    public static Usuarios: string = GlobalConstants.API + 'Usuario/';
    public static Ciudad: string = GlobalConstants.API + 'Ciudad/';
    public static ReporteStock: string = GlobalConstants.API + 'stock/';
    public static UnidadMedida: string = GlobalConstants.API + 'UnidadMedida/';
}



///http://10.0.100.107/CI/#/auth/login
///http://10.0.100.107/CI_API/swagger/index.html
