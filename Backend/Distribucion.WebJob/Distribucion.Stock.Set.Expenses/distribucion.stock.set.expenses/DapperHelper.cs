using Dapper;
using Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DapperHelper
{
    public class DapperHelper : IDapperHelper
    {
        string sqlConnection = //"Server = (localdb)\\.; Initial Catalog = DISTRIBUCIONDB; Persist Security Info=False; Integrated Security = true";
                               //"Server = (localdb)\\.; Initial Catalog = Distribucion_DEV; Persist Security Info=False; Integrated Security = true";
                               //"Server = tcp:192.168.0.28,1433;Initial Catalog = Distribucion_DEV; Persist Security Info=False;User ID = sa; Password=9090; ";
                               "Server = tcp:184.168.194.53;Initial Catalog = ph15924856351_Distribucion_DEV; Persist Security Info=False;User ID = devuser; Password=myPass1$; ";


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
                System.Diagnostics.Trace.WriteLine("SQlConnection = " + sqlConnection);
                using (IDbConnection connection = new SqlConnection(sqlConnection))
                {
                    return await connection.QueryAsync<T>(spName, param: (object)param, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task ExecuteSPonly (string spName, dynamic param = null)
        {
            try
            {
                using (IDbConnection connection = new SqlConnection(sqlConnection))
                {
                    var temp = await connection.ExecuteAsync(spName, param: (object)param, commandType: CommandType.StoredProcedure);
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
                System.Diagnostics.Trace.WriteLine("SQlConnection = " + sqlConnection);
                using (IDbConnection connection = new SqlConnection(sqlConnection))
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
                using (IDbConnection connection = new SqlConnection(sqlConnection))
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

        public async Task<T> ExecuteSPonly<T>(string spName, dynamic param = null) where T : class
        {
            try
            {
                using (IDbConnection connection = new SqlConnection(sqlConnection))
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



        public async Task<dynamic> ExecuteSP_MultipleResults<T, P>(string spName, dynamic param = null)
        {
            try
            {
                IDbConnection connection = new SqlConnection(sqlConnection);
                dynamic Data;
                
                using (var result = await connection.QueryMultipleAsync(spName, param: (object)param, commandType: CommandType.StoredProcedure))
                {
                    Data = result.Read<T>().ToList();
                    var SubCategoria = result.Read<P>().ToList();
                    
                    //foreach (T obj in Data) {
                    //    obj.SubCategoria = SubCategoria;
                    //}
                    //Data.SubCategoria = SubCategoria;
                }
                return await Data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Task<List<T>> ExecuteSP_Multiple<T>(object p)
        {
            throw new NotImplementedException();
        }

        public async Task<int> ExecuteSPoneValue(string spName, dynamic param = null)
        {
            try
            {
                using (IDbConnection connection = new SqlConnection(sqlConnection))
                {
                    var temp = await connection.QueryAsync<int>(spName, param: (object)param, commandType: CommandType.StoredProcedure);
                    return await Task.Run(() => Enumerable.FirstOrDefault<int>(temp));
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



    }
}
