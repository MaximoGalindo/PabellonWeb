using BussinessLogicLayer.Reponses;
using Microsoft.EntityFrameworkCore;
using Pabellon.Context.Core.Models;
using Pabellon.Core;
using Pabellon.Core.Models;

namespace BussinessLogicLayer.Services
{
    public class ProductService
    {
        private readonly PabellonDbContext _context;

        public ProductService(PabellonDbContext context)
        {
            _context = context;
        }

        public async Task<ProductResponse> SaveProduct(ProductRequest request)
        {
            Catalog catalog = await _context.Catalog.FirstOrDefaultAsync(x => x.Id == request.CatalogId);

            if (catalog == null)
                throw new Exception(Resources.GlobalResourses.CatalogNotExist);

            List<Option> options = new List<Option>();

            foreach (var id in request.OptionIds)
            {
                Option option = await _context.Options.Where(x => x.Id == id).FirstOrDefaultAsync();

                if (option == null)
                    throw new Exception(Resources.GlobalResourses.OptionNonExist);

                options.Add(option);
            }

            Product product = new Product
            {
                Name = request.Name,
                Price = request.Price,
                Image = request.ImageUrl,
                Options = options
            };

            product.Catalog = catalog;
            _context.Product.Add(product);
            _context.SaveChanges();

            return new ProductResponse
            {
                Id = product.Id,
                Name = product.Name,
                CatalogId = product.Catalog.Id,
                ImageUrl = product.Image,
                Price = product.Price,
                Options = product.Options.Select(x => new OptionResponse { Name = x.OptionName, Price = x.Price }).ToList()
            };
        }
    }
}