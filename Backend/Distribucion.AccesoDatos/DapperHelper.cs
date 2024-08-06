using Dapper;
using Distribucion.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Distribucion.AccesoDatos
{
    public class DapperHelper : IDapperHelper
    {
        /// <summary>
        /// Execute Stored Procedure (list of objects)
        /// </summary>
        /// <typeparam name="T">Return Type Object</typeparam>
        /// <param name="spName">Stored Procedure Name</param>
        /// <param name="param">Stored Procedure Parameters</param>
        /// <returns>ICollection of return type object</returns>
        public async Task<dynamic> ExecuteSP_Multiple<T>(string spName, dynamic param = null) where T : class
        {
            try
            {
                System.Diagnostics.Trace.WriteLine("SQlConnection = " + Conexion.ConexionBD());
                using (IDbConnection connection = new SqlConnection(Conexion.ConexionBD()))
                {
                    return await connection.QueryAsync<T>(spName, param: (object)param, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Execute Stored Procedure (single object)
        /// </summary>
        /// <typeparam name="T">Return Type Object</typeparam>
        /// <param name="spName">Stored Procedure Name</param>
        /// <param name="param">Stored Procedure Parameters</param>
        /// <returns>Return Type Object</returns>
        /// 
        public async Task<T> ExecuteSP_Single<T>(string spName, dynamic param = null) where T : class
        {
            try
            {
                System.Diagnostics.Trace.WriteLine("SQlConnection = " + Conexion.ConexionBD());
                using (IDbConnection connection = new SqlConnection(Conexion.ConexionBD()))
                {
                    var temp = await connection.QueryAsync<T>(spName, param: (object)param, commandType: CommandType.StoredProcedure);
                    return await Task.Run(() => Enumerable.FirstOrDefault<T>(temp));
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Execute Stored Procedure (execution)
        /// </summary>
        /// <typeparam name="T">Return Type Object</typeparam>
        /// <param name="spName">Stored Procedure Name</param>
        /// <param name="param">Stored Procedure Parameters</param>
        /// <returns>Return Type Object</returns>
        public async Task<T> ExecuteSP<T>(string spName, dynamic param = null) where T : class
        {
            try
            {
                using (IDbConnection connection = new SqlConnection(Conexion.ConexionBD()))
                {
                    var temp = await connection.QueryAsync<T>(spName, param: (object)param, commandType: CommandType.StoredProcedure);
                    return await Task.Run(() => Enumerable.FirstOrDefault<T>(temp));
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<dynamic> ExecuteSP_MultipleResults(string spName, dynamic param = null)
        {
            try
            {
                IDbConnection connection = new SqlConnection(Conexion.ConexionBD());
                var result = connection.QueryMultipleAsync(spName, param: (object)param, commandType: CommandType.StoredProcedure);
                var main = result.Read<T>().First();
                return await result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }

}
