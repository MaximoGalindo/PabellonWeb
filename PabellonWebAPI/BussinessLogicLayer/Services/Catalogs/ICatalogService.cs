using BussinessLogicLayer.Reponses;
using BussinessLogicLayer.Request;

namespace BussinessLogicLayer.Services.Catalogs
{
    public interface ICatalogService
    {
        Task<List<CatalogResponse>> GetAllCatalogs();
        Task<int> CreateCatalog(CatalogRequest catalogRequest);
        Task UpdateCatalog(string catalogId, UpdateCatalogRequest catalogRequest);
        Task DeleteCatalog(string catalogId);
    }
}
