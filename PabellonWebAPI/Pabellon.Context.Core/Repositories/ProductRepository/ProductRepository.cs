using Microsoft.EntityFrameworkCore;
using Pabellon.Context.Core.Repositories.ProductRepository;
using Pabellon.Core;
using Pabellon.Core.Models;

namespace Pabellon.Context.Core.Repositories.UserRepository
{
    public class ProductRepository : IProductRepository
    {
        private readonly PabellonDbContext _context;

        public ProductRepository(PabellonDbContext context)
        {
            _context = context;
        }

        public async Task Delete(int productId)
        {
            try
            {
                var product = await _context.Product.Include(p => p.Options).FirstOrDefaultAsync(p => p.Id == productId);
                if (product == null)
                    throw new ArgumentException(GlobalResourses.ResourceAccessor.GetString("ProductNonExist"));
                _context.Product.Remove(product);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(GlobalResourses.ResourceAccessor.GetString("ErrorDeleteProduct"));
            }
        }

        public async Task<List<Product>> GetByCatalogId(string catalogId)
        {
            return await _context.Product
                .Include(p => p.Catalog)
                .Include(p => p.Options)
                .Where(p => p.Catalog.Id == catalogId && p.Catalog.ExpirationDate == null)
                .ToListAsync();
        }

        public async Task<Product> GetById(int id)
        {
            var product = await _context.Product.Include(p => p.Options).FirstOrDefaultAsync(p => p.Id == id);
            return product ?? throw new ArgumentException(GlobalResourses.ResourceAccessor.GetString("ProductNonExist"));
        }

        public async Task Insert(Product product)
        {
            try
            {
                await _context.Product.AddAsync(product);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(GlobalResourses.ResourceAccessor.GetString("ErrorSaveProduct"));
            }
        }

        public async Task Update(Product product)
        {         
            try
            {
                _context.Update(product);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(GlobalResourses.ResourceAccessor.GetString("ErrorUpdateProduct"));
            }
        }

        public async Task<int> DisableProduct(int productId)
        {
            var product = await _context.Product.FirstOrDefaultAsync(p => p.Id == productId);
            if (product == null)
                throw new ArgumentException(GlobalResourses.ResourceAccessor.GetString("ProductNonExist"));

            product.Disabled = !product.Disabled;          
            try
            {
                _context.Update(product);
                return await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(GlobalResourses.ResourceAccessor.GetString("ErrorDisableProduct"));
            }
        }
    }
}
