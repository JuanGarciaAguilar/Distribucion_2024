using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Interfaces
{
    public interface IDapperHelper
    {
        Task<dynamic> ExecuteSP_Multiple<T>(string storedProcedure, dynamic param = null) where T : class;

        Task<List<T>> ExecuteSP_Multiple<T>(object p);

        Task ExecuteSPonly(string spName, dynamic param = null);

        Task<T> ExecuteSP_Single<T>(string spName, dynamic param = null) where T : class;

        Task<T> ExecuteSP<T>(string spName, dynamic param = null) where T : class;

        Task<dynamic> ExecuteSP_MultipleResults<T, P>(string storedProcedure, dynamic param = null);

        Task<int> ExecuteSPoneValue(string spName, dynamic param = null);
    }
}
