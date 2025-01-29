using Pabellon.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pabellon.Context.Core.Repositories.ProductRepository
{
    public interface IProductRepository
    {
        Task Insert(Product product);
        Task<List<Product>> GetByCatalogId(string catalogId);
    }
}
