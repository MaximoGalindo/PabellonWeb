using BussinessLogicLayer.Reponses;

namespace BussinessLogicLayer.Services.Catalog
{
    public interface ICatalogService
    {
        Task<List<CatalogResponse>> GetAllCatalogs();
    }
}
