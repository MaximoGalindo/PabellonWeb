using BussinessLogicLayer.Helpers;
using BussinessLogicLayer.Reponses;
using BussinessLogicLayer.Request;
using Pabellon.Context.Core.Models;
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

            var options = new List<Option>();
            if (request.OptionIds != null && request.OptionIds.Count > 0)
            {
                options = await _optionRepository.GetByIds(request.OptionIds);

                var optionIdsNonExist = request.OptionIds.Except(options.Select(o => o.Id)).ToList();
                if (optionIdsNonExist.Any())
                    throw new ArgumentException(GlobalResourses.ResourceAccessor.GetString("OptionNonExist"));
            }

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

        public async Task<List<ProductResponse>> GetProductListByCatalog(string catalogId, bool orderBy)
        {
            var products = await _productRepository.GetByCatalogId(catalogId);

            IEnumerable<ProductResponse> productResponses = products.Select(product => new ProductResponse
            {
                Id = product.Id,
                Name = product.Name,
                Image = product.Image, //_imagesHelper.GetImage(product.Image),
                Price = product.Price,
                CatalogId = product.Catalog.Id,
                Description = product.Description ?? "",
                Disabled = product.Disabled,
                Options = product.Options.Select(o => new OptionResponse
                {
                    Id = o.Id,
                    Name = o.OptionName,
                    Price = o.Price,
                    AllowQuantity = o.AllowsQuantity,
                    IsSelected = false
                }).ToList()
            })
            .ToList();

            if (orderBy)
                productResponses = productResponses.OrderBy(p => p.Disabled);

            return productResponses.ToList();
        }

        public async Task UpdateProduct(int productId, UpdateProductRequest request)
        {
            var product = await _productRepository.GetById(productId);

            product.Options.Clear();
            product.Description = request.Description;
            product.Name = request.Name;
            product.Price = request.Price;
            if(request.Image != null)
            {
                _imagesHelper.DeleteImage(product.Image);
                product.Image = await _imagesHelper.SaveImage(request.Image);
            }
                
            product.Options = await _optionRepository.GetByIds(request.OptionIds);
            product.CatalogId = request.CatalogId;

            await _productRepository.Update(product);
        }

        public async Task DeleteProduct(int productId)
        {
            var product = await _productRepository.GetById(productId);
            _imagesHelper.DeleteImage(product.Image);
            await _productRepository.Delete(productId);
        }

        public async Task<ProductResponse> GetProductById(int productId)
        {
            var product = await _productRepository.GetById(productId);

            var response = new ProductResponse
            {
                Id = product.Id,
                Name = product.Name,
                Image = product.Image,
                Price = product.Price,
                CatalogId = product.CatalogId,
                Description = product.Description ?? "",
                Disabled = product.Disabled,
                Options = product.Options.Select(o => new OptionResponse
                {
                    Id = o.Id,
                    Name = o.OptionName,
                    Price = o.Price,
                    AllowQuantity = o.AllowsQuantity,
                    IsSelected = false
                }).ToList()
            };

            return response;
        }

        public async Task<bool> DisableProduct(int productId)
        {
            var result = await _productRepository.DisableProduct(productId);
            if (result > 0)
                return true;
            else
                throw new Exception(GlobalResourses.ResourceAccessor.GetString("ErrorDisableProduct"));
        }

        public async Task<List<ProductResponse>> SearchByName(string catalogId, string query)
        {
            var products = await _productRepository.SearchByName(catalogId, query);
            var response = products.Select(p => new ProductResponse
            {
                Id = p.Id,
                Name = p.Name
            }).ToList();
            return response;
        }
    }
}