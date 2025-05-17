using Pabellon.Core.Models;

namespace Pabellon.Context.Core.Repositories.CatalogRepository
{
    public interface ICatalogRepository
    {
        Task<Catalog> GetById(string catalogId);
        Task<List<Catalog>> GetAll();
        Task<int> Insert(Catalog catalog);
        Task Delete(string catalogId);
        Task Update(Catalog catalog);
    }
}
