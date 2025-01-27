using BussinessLogicLayer.Helpers;
using BussinessLogicLayer.Reponses;
using Pabellon.Context.Core.Repositories.CatalogRepository;

namespace BussinessLogicLayer.Services.Catalog
{
    public class CatalogService : ICatalogService
    {
        private readonly ICatalogRepository _catalogRepository;
        private readonly ImagesHelper _imagesHelper;

        public CatalogService(ICatalogRepository catalogRepository)
        {
            _catalogRepository = catalogRepository;
        }

        public async Task<List<CatalogResponse>> GetAllCatalogs()
        {
            var catalogs = await _catalogRepository.GetAll();
            List<CatalogResponse> catalogResponses = new List<CatalogResponse>();   

            foreach(var catalog in catalogs) 
            {
                string imgCatalog = $"{catalog.Id}-{catalog.Name.Replace(" ", "-")}";

                catalogResponses.Add(new CatalogResponse
                {
                    Id = catalog.Id,
                    Name = catalog.Name,
                    Img = _imagesHelper.GetImage(imgCatalog),
                });          
            }
            return catalogResponses;
        }
    }
}
