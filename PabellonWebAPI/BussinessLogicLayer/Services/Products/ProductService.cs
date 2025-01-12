using BussinessLogicLayer.Reponses;
using Microsoft.EntityFrameworkCore;
using Pabellon.Context.Core.Models;
using Pabellon.Context.Core.Repositories.CatalogRepository;
using Pabellon.Context.Core.Repositories.OptionsRepository;
using Pabellon.Context.Core.Repositories.ProductRepository;
using Pabellon.Core;
using Pabellon.Core.Models;

namespace BussinessLogicLayer.Services.Products
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly ICatalogRepository _catalogRepository;
        private readonly IOptionRepository _optionRepository;

        public ProductService(IProductRepository productRepository, ICatalogRepository catalogRepository, IOptionRepository optionRepository)
        {
            _productRepository = productRepository;
            _catalogRepository = catalogRepository;
            _optionRepository = optionRepository;
        }   

        public async Task SaveProduct(ProductRequest request)
        {
            var catalog = await _catalogRepository.GetById(request.CatalogId);
            if (catalog == null)
                throw new ArgumentException(GlobalResourses.ResourceAccessor.GetString("CatalogNonExist"));

            var options = await _optionRepository.GetByIds(request.OptionIds);

            var optionIdsNonExist = request.OptionIds.Except(options.Select(o => o.Id)).ToList();
            if (optionIdsNonExist.Any())
                throw new ArgumentException(GlobalResourses.ResourceAccessor.GetString("OptionNonExist"));

            var product = new Product
            {
                Name = request.Name,
                Price = request.Price,
                Image = request.ImageUrl,
                Options = options,
                Catalog = catalog,
                Observation =  !string.IsNullOrWhiteSpace(request.Observation) ? request.Observation : string.Empty,
                Units = request.Units               
            };

            await _productRepository.Insert(product);            
        }

        public async Task<List<ProductResponse>> GetProductListByCatalog(int catalogId)
        {
            var products = await _productRepository.GetByCatalogId(catalogId);

            var productResponses = products.Select(product => new ProductResponse
            {
                Id = product.Id,
                Name = product.Name,
                ImageUrl = product.Image,
                Price = product.Price,
                CatalogId = product.Catalog.Id,
                Options = product.Options.Select(o => new OptionResponse
                {
                    Id = o.Id,
                    Name = o.OptionName,
                    Price = o.Price
                }).ToList()
            }).ToList();

            return productResponses;
        }
    }
}