using BussinessLogicLayer.Helpers;
using BussinessLogicLayer.Reponses;
using BussinessLogicLayer.Request;
using Pabellon.Context.Core.Repositories.CatalogRepository;
using Pabellon.Context.Core.Repositories.OptionsRepository;
using Pabellon.Context.Core.Repositories.ProductRepository;
using Pabellon.Core.Models;

namespace BussinessLogicLayer.Services.Products
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly ICatalogRepository _catalogRepository;
        private readonly IOptionRepository _optionRepository;
        private readonly ImagesHelper _imagesHelper;

        public ProductService(IProductRepository productRepository, ICatalogRepository catalogRepository, IOptionRepository optionRepository, ImagesHelper imagesHelper)
        {
            _productRepository = productRepository;
            _catalogRepository = catalogRepository;
            _optionRepository = optionRepository;
            _imagesHelper = imagesHelper;
        }

        public async Task SaveProduct(CreateProductRequest request)
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
                Image = await _imagesHelper.SaveImage(request.Image),
                Options = options,
                Catalog = catalog,
                Description =  !string.IsNullOrWhiteSpace(request.Description) ? request.Description : string.Empty              
            };

            await _productRepository.Insert(product);            
        }

        public async Task<List<ProductResponse>> GetProductListByCatalog(string catalogId)
        {
            var products = await _productRepository.GetByCatalogId(catalogId);

            var productResponses = products.Select(product => new ProductResponse
            {
                Id = product.Id,
                Name = product.Name,
                Image = _imagesHelper.GetImage(product.Image),
                Price = product.Price,
                CatalogId = product.Catalog.Id,
                Description = product.Description ?? "",
                Options = product.Options.Select(o => new OptionResponse
                {
                    Id = o.Id,
                    Name = o.OptionName,
                    Price = o.Price
                }).ToList()
            }).ToList();

            return productResponses;
        }

        public async Task UpdateProduct(int productId, UpdateProductRequest request)
        {
            var product = await _productRepository.GetById(productId);

            product.Options.Clear();
            product.Description = request.Description;
            product.Name = request.Name;
            product.Price = request.Price;
            product.Image = await _imagesHelper.SaveImage(request.Image);
            product.Options = await _optionRepository.GetByIds(request.OptionIds);
            product.CatalogId = request.CatalogId;

            await _productRepository.Update(product);
        }

        public async Task DeleteProduct(int productId)
        {
           await _productRepository.Delete(productId);
        }
    }
}