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
/*     static API: string = 'http://localhost:51629/api/';
    static DOMINIO: string = 'http://localhost:51629/'; */
    //? ------------------------------------------------
 //? -- -------ENTORNO produccion--------------------
    protected API: string = 'http://distribuye-dis-go-api.azurewebsites.net/api/';
    static API: string = 'http://distribuye-dis-go-api.azurewebsites.net/api/';
 //? ------------------------------------------------

    public static ControlInterno: string = GlobalConstants.API + 'Control/';
    public static Constantes: string = GlobalConstants.API + 'Constantes/';
   // public static Proveedor: string = GlobalConstants.API + 'Proveedor/';
    public static FileVersion: string = GlobalConstants.API + 'Files/';
    public static Perfil: string = GlobalConstants.API + 'Perfil/';
    public static PerfilMovimiento: string = GlobalConstants.API + 'PerfilMovimiento/';
    public static Altas: string = GlobalConstants.API + 'Altas/';
    public static Servidores: string = GlobalConstants.API + 'Servidores/';
    public static Modulo: string = GlobalConstants.API + 'Modulo/';
    public static Usuario: string = GlobalConstants.API + 'Usuario/';
    public static PerfilCargo: string = GlobalConstants.API + 'PerfilCargo/';
    public static Notificaciones: string = GlobalConstants.API + 'Notificaciones/';
    public static Dba: string = GlobalConstants.API + 'Dba/';



    public static Producto: string = GlobalConstants.API + 'Producto/';
    public static Ventas: string = GlobalConstants.API + 'Venta/';
    public static Sector: string = GlobalConstants.API + 'Sector/';
    public static Cliente_nt: string = GlobalConstants.API + 'Cliente_nt/';
    public static Cliente: string = GlobalConstants.API + 'Cliente/';
    public static Stock: string = GlobalConstants.API + 'Stock/';
    public static Compra: string = GlobalConstants.API + 'Compra/';
    public static CompraDetalle: string = GlobalConstants.API + 'CompraDetalle/';
    public static Proveedor: string = GlobalConstants.API + 'Proveedor/';
}



///http://10.0.100.107/CI/#/auth/login
///http://10.0.100.107/CI_API/swagger/index.html
