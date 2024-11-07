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
                throw new ArgumentException(Resources.GlobalResourses.CatalogNotExist);

            var options = await _optionRepository.GetByIds(request.OptionIds);

            var missingOptionIds = request.OptionIds.Except(options.Select(o => o.Id)).ToList();
            if (missingOptionIds.Any())
                throw new ArgumentException(Resources.GlobalResourses.OptionNonExist);

            var product = new Product
            {
                Name = request.Name,
                Price = request.Price,
                Image = request.ImageUrl,
                Options = options,
                Units = request.Units,
                Catalog = catalog
            };

            await _productRepository.Insert(product);            
        }
    }
}