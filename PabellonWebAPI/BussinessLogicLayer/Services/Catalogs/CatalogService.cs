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

        public async Task UpdateCatalog(string catalogId, UpdateCatalogRequest catalogRequest)
        {
            var catalog = await _catalogRepository.GetById(catalogId);

            if(catalog == null)
                throw new ArgumentException(GlobalResourses.ResourceAccessor.GetString("CatalogNonExist"));

            catalog.Order = catalogRequest.Order;
            catalog.Name = catalogRequest.Name;
            if (catalogRequest.ImgUrl != null)
            {
                catalog.Img = await _imagesHelper.SaveImage(catalogRequest.ImgUrl);
            }

            await _catalogRepository.Update(catalog);
        }

        public async Task DeleteCatalog(string catalogId)
        {
            await _catalogRepository.Delete(catalogId);
        }

        public async Task<List<CatalogResponse>> GetCatalogsName()
        {
            var catalogs = await _catalogRepository.GetAll();
            var response = catalogs.Select(c => new CatalogResponse
            {
                Id = c.Id,
                Name = c.Name
            }).ToList();

            return response;
        }

        public async Task<CatalogResponse> GetCatalogById(string catalogId)
        {
            var catalog = await _catalogRepository.GetById(catalogId);
            if (catalog == null)
                throw new ArgumentException(GlobalResourses.ResourceAccessor.GetString("CatalogNonExist"));

            var response = new CatalogResponse
            { 
                Id = catalog.Id, 
                Name = catalog.Name,
                Img = _imagesHelper.GetImage(catalog.Img),
            };
            return response; 
        }
    }
}
