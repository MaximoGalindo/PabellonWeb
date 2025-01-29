using BussinessLogicLayer.Helpers;
using BussinessLogicLayer.Reponses;
using BussinessLogicLayer.Request;
using Pabellon.Context.Core.Repositories.CatalogRepository;
using Pabellon.Core.Models;

namespace BussinessLogicLayer.Services.Catalogs
{
    public class CatalogService : ICatalogService
    {
        private readonly ICatalogRepository _catalogRepository;
        private readonly ImagesHelper _imagesHelper;

        public CatalogService(ICatalogRepository catalogRepository, ImagesHelper imagesHelper)
        {
            _catalogRepository = catalogRepository;
            _imagesHelper = imagesHelper;
        }

        public async Task<int> CreateCatalog(CatalogRequest catalogRequest)
        {
            var catalog = new Catalog
            {
                Id = Guid.NewGuid().ToString(),
                Name = catalogRequest.Name,
                Img = await _imagesHelper.SaveImage(catalogRequest.ImgUrl),
                Order = catalogRequest.Order
            };

            return await _catalogRepository.Insert(catalog);
        }

        public async Task<List<CatalogResponse>> GetAllCatalogs()
        {
            var catalogs = await _catalogRepository.GetAll();
            List<CatalogResponse> catalogResponses = new List<CatalogResponse>();   

            foreach(var catalog in catalogs) 
            {
                catalogResponses.Add(new CatalogResponse
                {
                    Id = catalog.Id,
                    Name = catalog.Name,
                    Img = _imagesHelper.GetImage(catalog.Img),
                });          
            }
            return catalogResponses;
        }
    }
}
