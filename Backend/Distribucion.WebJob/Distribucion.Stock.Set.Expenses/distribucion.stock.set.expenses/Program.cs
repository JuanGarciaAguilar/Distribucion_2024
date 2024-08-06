using Interfaces;
using StoredProcedures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Stock.Set.Expenses
{
    class Program
    {
        static void Main(string[] args)
        {
            IDapperHelper dapperHelper = new DapperHelper.DapperHelper();
            try
            {
                List<object> list = dapperHelper.ExecuteSP_Multiple<object>(StoredProcedure.STOCK_SET_EXPENSES).Result;
                foreach (var item in list)
                {
                    Console.WriteLine(item);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
        }
    }
}
