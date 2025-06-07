using Pabellon.Core.Models;

namespace Pabellon.Context.Core.Repositories.ProductRepository
{
    public interface IProductRepository
    {
        Task Insert(Product product);
        Task Delete(int productId);
        Task Update(Product product);
        Task<Product> GetById(int id);
        Task<List<Product>> GetByCatalogId(string catalogId);
        Task<int> DisableProduct(int productId);
        Task<List<Product>> SearchByName(string catalogId, string query);
    }
}
