using BussinessLogicLayer.Reponses;

namespace BussinessLogicLayer.Services.Catalogs
{
    public interface ICatalogService
    {
        Task<List<CatalogResponse>> GetAllCatalogs();
    }
}
