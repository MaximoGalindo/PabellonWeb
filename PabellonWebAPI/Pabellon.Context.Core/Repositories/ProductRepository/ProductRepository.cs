using Microsoft.EntityFrameworkCore;
using Pabellon.Context.Core.Repositories.ProductRepository;
using Pabellon.Core;
using Pabellon.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace Pabellon.Context.Core.Repositories.UserRepository
{
    public class ProductRepository : IProductRepository
    {
        private readonly PabellonDbContext _context;

        public ProductRepository(PabellonDbContext context)
        {
            _context = context;
        }

        public async Task<List<Product>> GetByCatalogId(int catalogId)
        {
            return await _context.Product
                .Include(p => p.Catalog)
                .Include(p => p.Options)
                .Where(p => p.Catalog.Id == catalogId).ToListAsync();
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


    }
}
